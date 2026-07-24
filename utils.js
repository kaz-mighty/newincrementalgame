function Utilsdata() {
    this.softCap = function (num, cap) {
        if (num.lessThanOrEqualTo(cap)) return num;
        let capped = num.div(cap)
        capped = new Decimal(capped.log2()).add(1)
        return cap.mul(capped).min(num)
    }

    this.strongsoftcap = function (num, cap) {
        if (num.lessThanOrEqualTo(cap)) return num;
        let capped = num.div(cap)
        capped = new Decimal(capped.log2()).add(1)
        capped = new Decimal(capped.log2()).add(1)
        return cap.mul(capped).min(num)
    }

    this.toFormated = function (dec, exp) {
        if (dec.lessThanOrEqualTo(new Decimal(10).pow(exp))) return dec.toNumber()
        else return dec.toExponential(3)
    }

    this.sleep = function (ms) {
        var startMsec = new Date();
        while (new Date() - startMsec < ms);
    }
}
