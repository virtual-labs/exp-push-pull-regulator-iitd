let values = {
    vIn:0,
    D:0,
    R:0,
    n:0,
}

//* n is the ratio of ns/np , vIn is vG, d is equal to d1, d2
function updateValues(vIn,D,R,n){
    values = {
        vIn:vIn,
        D:D,
        R:R,
        n:n,
    }
}

const Formulas = {  
    one_minus_D(D){
        return 1 - D
    },
    step2:{

        v0(values){
            let ans = values.n * values.D * values.vIn
            return Number(ans.toFixed(4))
        },

        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },

        iL(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        delIL(values){
            const L = 0.001, fs = 50 * 1000
            let numerator = values.D * ((values.n * values.vIn) - this.v0(values))
            let denominator = L*fs
            let ans = numerator / denominator
            return Number(ans.toFixed(4))            
        },
        i2(values){
            let ans = this.iL(values) + (this.delIL(values)/2)
            return Number(ans.toFixed(4))
        },
        i1(values){
            let ans = this.iL(values) - (this.delIL(values)/2)
            return Number(ans.toFixed(4))
        },
        iQ12(values){
            let ans = values.n * (this.iL(values) + (this.delIL(values) / 2))  
            return Number(ans.toFixed(4))
        },
        iQ11(values){
            let ans = values.n * (this.iL(values) - (this.delIL(values) / 2))  
            return Number(ans.toFixed(4))
        },

    },

    ideal:{
        v0(values){
            let ans = values.n * values.D * values.vIn
            return Number(ans.toFixed(4))
        },
    
        M(values){
            let ans = values.n * values.D
            return Number(ans.toFixed(4))
        },
    
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        
        iL(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },

        iG(values){
            let ans = values.D * values.n * this.i0(values);
            return Number(ans.toFixed(4))
        }
    },

    nonIdeal:{
        M(values){
            //! values not given by mam
            const vFD1 = 0.7, rDS1_on = 0.2, rl = 0.3

            let numerator = ((values.n * values.D)  - (vFD1 / values.vIn))
            let denominator = ((rl + (rDS1_on * values.D)) / values.R)

            let ans  = numerator / (1 + denominator)
            return Number(ans.toFixed(4))
        },
        v0(values){
            //! values not given by mam
            const vFD1 = 0.7, rDS1_on = 0.2, rl = 0.3

            let numerator = ((values.n * values.D * values.vIn) - vFD1)
            let denominator = ((rl + (rDS1_on * values.D)) / values.R)

            let ans  = numerator / (1 + denominator)
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        il(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        iG(values){
            let ans = values.D * values.n * this.i0(values)
            return Number(ans.toFixed(4))
        }

    },

    efficiencyPlot:{
        M(values){
            //! values not given by mam
            const vFD1 = 0.7, rDS1_on = 0.2, rl = 0.3

            let numerator = ((values.n * values.D)  - (vFD1 / values.vIn))
            let denominator = ((rl + (rDS1_on * values.D)) / values.R)

            console.log(values.n, values.D, vFD1, values.vIn)
            console.log(numerator, denominator)

            let ans  = numerator / (1 + denominator)
            return Number(ans.toFixed(4))
        },
        v0(values){
            const vFD1 = 0.7, rDS1_on = 0.2, rl = 0.3

            let numerator = ((values.n * values.D * values.vIn) - vFD1)
            let denominator = ((rl + (rDS1_on * values.D)) / values.R)

            let ans  = (numerator / (1 + denominator))
            return Number(ans.toFixed(4))
        },
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        il(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        iG(values){
            let ans = values.D * values.n * this.i0(values)
            return Number(ans.toFixed(4))
        },

        pIn(values){
            let ans = values.vIn * this.iG(values)
            return Number(ans.toFixed(4))
        },
    
        pOut(values){
            let ans = this.v0(values) * this.i0(values)
            return Number(ans.toFixed(4))
        },

        pLosses(values){
            let ans = this.pIn(values) - this.pOut(values)
            return Number(ans.toFixed(4))
        },
    
        eff(values){
            let ans = (this.pOut(values) * 100) / this.pIn(values)
            return Number(ans.toFixed(4))
        }
    },

    stress:{
        v0(values){
            let ans = values.n * values.D * values.vIn
            return Number(ans.toFixed(4))
        },
    
        M(values){
            let ans = values.n * values.D
            return Number(ans.toFixed(4))
        },
    
        i0(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },
        
        iL(values){
            let ans = this.v0(values) / values.R
            return Number(ans.toFixed(4))
        },

        iG(values){
            let ans = values.D * values.n * this.i0(values);
            return Number(ans.toFixed(4))
        },
        delIL(values){
            const L = 0.001, fs = 50 * 1000
            let numerator = (values.D * ((values.n * values.vIn) - this.v0(values)))
            let denominator = L*fs
            let ans = numerator / denominator
            console.log("delIL",ans)
            return Number(ans.toFixed(4))            
        },
        i2(values){
            console.log("il", this.iL(values))
            // console.log("i2", this.i2(values))
            let ans = this.iL(values) + (this.delIL(values)/2)
            return Number(ans.toFixed(4))
        },
        
    },
}
