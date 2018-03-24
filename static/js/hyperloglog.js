var pow_2_32 = 0xFFFFFFFF + 1;
function HyperLogLog(m) {
    function log2(x) {
        return Math.log(x) / Math.LN2;
    }

    function rightmostIndexOf1(hash, max) {
        var r = 1;
        while ((hash & 1) == 0 && r <= max) {
            ++r;
            hash >>>= 1;
        }
        return r;
    }

    var k = m
    var k_comp = 32 - k;
    m = Math.pow(2.0, m);

    var alpha_m = m == 16 ? 0.673
        : m == 32 ? 0.697
            : m == 64 ? 0.709
                : 0.7213 / (1 + 1.079 / m);

    var M = [];
    for (var i = 0; i < m; ++i) {
        M[i] = 0;
    }

    function add(hash) {
        var b = hash >>> k_comp;
        var w = rightmostIndexOf1(hash, k_comp);
        var currentRegister = M[b]
        M[b] = Math.max(currentRegister, w);

        var registerUpdated = false;
        if(w > currentRegister) {
            registerUpdated = true;
        }
        return {"h": hash, "b": b, "w": w, "p": 32-k_comp, "registerUpdated": registerUpdated};
    }

    function merge(other) {
        for (var i = 0; i < m; i++) {
            M[i] = Math.max(M[i], other.buckets[i]);
        }
    }

    function count() {
        //am * m^2 * Z
        var z = harmonicMean();
        var originalEstimate = alpha_m * (m * m) * z;
        var E = originalEstimate;
        var correction_used = null;

        // -- make corrections
        //TODO research this more 
        if (E <= 5 / 2 * m) {
            var registersThatContainZero = linearCount();
            if (registersThatContainZero > 0) {
                correction_used = {
                    "name": "LinearCount",
                    "metadata": {
                        "V": registersThatContainZero,
                        "FillFactor": 1.0 - (registersThatContainZero / m)
                    }
                };
                E = -m * Math.log(registersThatContainZero / m);
            }
        } else if (E > 1 / 30 * pow_2_32) {
            correction_used = {
                "name": "Other",
                "metadata": {}
            };
            E = -pow_2_32 * Math.log(1 - E / pow_2_32);
        }

        return {
            "estimate": E,
            "originalEstimate": originalEstimate,
            "correction_used": correction_used,
            "alpha_m": alpha_m,
            "z": z,
            "m": m
        }
    }

    function harmonicMean() {
        var z = 0.0;
        for (var i = 0; i < m; ++i) {
            z += Math.pow(2, -M[i]);
        }
        return Math.pow(z, -1);
    }

    function linearCount() {
        var registersThatContainZero = 0;
        for (var i = 0; i < m; ++i) {
            if (M[i] == 0) {
                registersThatContainZero++;
            }
        }
        return registersThatContainZero;
    }

    return { add: add, count: count, merge: merge, buckets: M, p: k };
}
