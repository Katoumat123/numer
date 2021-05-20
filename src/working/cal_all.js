import { bignumber, e, identity, matrix } from 'mathjs';
var regression = require('regression')
var interpolationQuadratic_Poly_linear = require('interpolating-polynomial')
const Spline = require('cubic-spline');
const math = require('mathjs');
function checkEquation (equation){
    equation = equation.replaceAll('X','x')

    return equation
}
export function copyArray(n,matrix1){
   let arr = []
    for(let i = 0;i < n ; i++){
        arr.push([])
        arr[i] = [].concat(matrix1[i])
    }
    return arr;

}
///Bisection
export function calBisection  (initialEquation ,initialXL,initialXR,initialError) {
    let equation = checkEquation(initialEquation)
        equation = math.parse(equation).compile()
    let  xl = math.bignumber(initialXL)
    let xr = math.bignumber(initialXR)
    let error = math.bignumber(initialError)


    let arr = []


    let xm = math.divide(math.add(xl,xr),2)

    let fx = math.multiply(equation.evaluate({x :xm}),equation.evaluate({x :xr}))

    if(fx < 0){
        xl = xm;
    }
    else{
        xr = xm;
    }

    let checkError = 9999;

    let oldXm = xm;

    let i = 0;
    while(checkError > error){

        xm = math.divide(math.add(xl,xr),2)

        fx = math.multiply(equation.evaluate({x :xm}),equation.evaluate({x :xr}))

        if(fx < 0){
            xl = xm;
        }
        else{
            xr = xm;
        }
        checkError = Math.abs((xm-oldXm)/xm);

        oldXm = xm;

      
        //arr.push({key : i , iteration : i.toString() ,xm : xm.toFixed(15).toString() ,error : checkError.toFixed(15).toString()})
        arr.push(<div> {i}: {xm.toFixed(15).toString()}</div>)
        i++;
    
    }
    return(arr);
}
//Bisection
export function fasepositioncal( init_xl, init_xr, init_error,init_fx){

    init_fx = checkEquation(init_fx);
    let data=[];
    let fx = math.parse(init_fx).compile()
    let xl = math.bignumber(init_xl)
    let xr = math.bignumber(init_xr)
    let er = math.bignumber(init_error)
    let fxl = fx.evaluate({x:xl});
    let fxr = fx.evaluate({x:xr});
    let x = math.divide(math.subtract(math.multiply(xl,fxr),math.multiply(xr,fxl)),math.subtract(fxr,fxl));
    let num =math.multiply(fx.evaluate({x:x}),fxr);
    let tmp_er = 9999999;
    let new_x = 0;
    let i =1;

    if(num>0){
        xr = x;
    }
    else if(num<0){
        xl = x;
    }

    while(tmp_er > er){
        fxr = fx.evaluate({x:xr});
        fxl = fx.evaluate({x:xl});
        new_x = math.divide(math.subtract(math.multiply(xl,fxr),math.multiply(xr,fxl)),math.subtract(fxr,fxl));
        num = math.multiply(fx.evaluate({x:x}),fxr);
        if(num>0){
            xr = new_x;
        }
        else if(num<0){
            xl = new_x;
        }
        tmp_er = math.abs(math.divide(math.subtract(new_x,x),new_x))
        x = new_x;
        data.push(<div>{i}: z is {x.toFixed(15).toString()}</div>)
        i++;
    }


    return data;
}

export function calOnepoint(initialEquation ,initialX,initialError){

    let equation =checkEquation(initialEquation)
    equation = math.parse(equation).compile()
     
     let X = math.bignumber(initialX)

     let error = math.bignumber(initialError)
     
     let arr = []

     let i = 1;
     
     
     let oldX = 0;

     let checkError = 1
     let oldcheckError = 2;
     arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
     while(checkError > error){

        
         X  = equation.evaluate({x : X})

         checkError =  math.abs((X - oldX)/X);
         if(i>3&&(checkError > oldcheckError)){
            arr.push(<div>ลู่ออก</div>)
            break;
        }
          oldcheckError = checkError;
        
         oldX = X
         
        
        arr.push(<div>i :{i} iterration :{i.toString()} x:  {X.toFixed(15).toString()} error : {checkError.toFixed(15).toString()}</div>)
        i++
        
     }
     return arr
}


export function calNewton(initialEquation, initialX, initialError) {

    let equation = checkEquation(initialEquation)

    equation = math.parse(equation)
    let X = math.bignumber(initialX)

    let fXprime = math.derivative(equation,'x').compile()
    
   
    let error = math.bignumber(initialError)

    

    let arr = []

    let i = 1;


    let oldX = X;

    let checkError = 9999
    let oldcheckError = 9999;
   
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)


    while (checkError > error) {

        let fXdiff = fXprime.evaluate({x : X})
        let fX = equation.evaluate({ x: X })
        X = math.subtract(X, math.divide(fX, fXdiff))



        checkError = math.abs((X - oldX) / X);
        if ((checkError > oldcheckError)&&i>3) {
            arr.push(<div>ลู่ออก</div>)
            break;
        }
        oldcheckError = checkError;

        oldX = X

        arr.push(<div>iteration: {i.toString()} x: {X.toFixed(15).toString()} error: {checkError.toFixed(15).toString()} </div>)
        
        i++

    }
    return arr
}
export function calSecant(initialEquation, initialX0,initialX1, initialError) {

     let equation = checkEquation(initialEquation)

    equation = math.parse(equation).compile()
    let x0 = math.bignumber(initialX0)
    let x1 = math.bignumber(initialX1)


   let fx0 = equation.evaluate({x:x0})
   let fx1 = equation.evaluate({x:x1})
    
   
    let error = math.bignumber(initialError)

    

    let arr = []

    let i = 1;


    let oldX = 0;

    let checkError = 9999
    let oldcheckError = 9999;
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)

    while (checkError > error) {

    let    x = math.subtract(x1 , math.divide(math.multiply(fx1,math.subtract(x0 , x1) ), math.subtract(fx0 , fx1)));
            
            checkError = Math.abs((x - x1)/x);
            
            fx0 = fx1;
            x0 = x1;
            x1 = x;
            fx1 = equation.evaluate({x : x1})


       
        if (checkError > oldcheckError) {
            arr.push(<div>ลู่ออก</div>)
            break;
        }
        oldcheckError = checkError;

        

        arr.push(<div>iteration: {i.toString()} x: {x.toFixed(15).toString()} error: {checkError.toFixed(15).toString()}</div>)
       
        i++

    }
    
    return arr
}

export function calCramer(n, initialMatrix1, initialMatrix2) {
    let matrix1 = math.bignumber(initialMatrix1)
    let matrix2 = math.bignumber(initialMatrix2)
    let det_matrixA = math.det(matrix1)

    let temp_matrix1 = copyArray(n, matrix1)

    let arr = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
    let X = [];




    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {
            temp_matrix1[j][i] = matrix2[j]
        }
        X[i] = math.divide(math.det(temp_matrix1), det_matrixA).toFixed(15).toString()

        //arr.push({key : i , x : 'X'+(i+1) ,valuex : X[i]})
        arr.push(<div className="result"> X{i + 1} = {X[i]}</div>)

        temp_matrix1 = copyArray(n, matrix1);
    }

    return arr
}





export function calElimination(n, initialMatrix1, initialMatrix2) {

    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    
    
    let arr = []
    let X = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)

    for(let i = 0 ; i < n ; i++){
        matrix1[i].push(matrix2[i]) 
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < n ; i++){
        for(let j = i ;j < n ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < n+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
                
            }
    
        }
         
    }

    for(let i = n-1 ;i >= 0 ; i--){
        let sum = 0;
        for(let j = 0 ; j < n ;j++){
            sum = sum + matrix1[i][j]*X[j];
        }
        sum = sum - matrix1[i][i]
        X[i] = ((matrix1[i][n] - sum)/matrix1[i][i])
        
    }
   // X.map((x,i) => arr.push({key : i , x : 'X'+(i+1) , valuex : x.toFixed(5)}))
    X.map((x,i) => arr.push(<div className ="result">x{i+1}= {x.toFixed(15)}</div>))

        
    return arr
}


export function calJordan(n, initialMatrix1, initialMatrix2) {

    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    
    
    let arr = []
    
    let X = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
    
    
    for(let i = 0 ; i < n ; i++){
        matrix1[i].push(matrix2[i]) 
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < n ; i++){
        for(let j = i ;j < n ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < n+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
              
            }
    
        }
         
    }
    for(let i = n-2;i >= 0 ; i--){
        for(let j = i ;j >= 0 ; j--){

            let divide = matrix1[i+1][i+1]
            let multi = matrix1[j][i+1]

            for(let k = n ; k >= i;k--){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i+1][k]/divide)*multi)
              
            }
    
        }
         
    }

    for(let i = 0 ;i < n ; i++){
        X[i] = ((matrix1[i][n] )/matrix1[i][i])
    }
       
      
        
    
    //X.map((x,i) => arr.push({key : i , x : 'X'+(i+1) , valuex : x.toFixed(5)}))
    X.map((x,i) => arr.push(<div>x{i+1}= {x.toFixed(15)}</div>))
        
    return arr
}

export function calLu(n, initialMatrix1, initialMatrix2) {

    let A = initialMatrix1
    let B = initialMatrix2

   
   
    let arr = []
    let U = []
    let L = []
    let Y = []
    let X = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
    
    for (let i = 0; i < n; i++) {
            U.push([])
            L.push([])
            Y.push(1)
            X.push(1)
        for (let j = 0; j < n; j++) {
            L[i][j]=0
            if(i == j){
                U[i][j]= 1
            }
            else{
                
                U[i][j]=0
            }
               
               
           
           
            

        }
    }
    //  console.log(L.toString())
    //  console.log(U.toString())
    //  console.log(Y.toString())
    //  console.log(X.toString())
    
    for (let i = 0; i < n; i++) {

        for (let j = 0; j < n; j++) {

            let sum = 0

            for (let k = 0; k < n; k++) {


                if (k != j || i < j) {
                    sum += L[i][k] * U[k][j]
                }


            }
            if (i >= j) {
                sum = A[i][j] - sum;
                L[i][j] = sum;
            }
            else {
                sum = A[i][j] - sum;
                U[i][j] = sum / L[i][i];
            }
        }
    }
   
    
    for (let i = 0; i < n; i++) {
        let sum = 0;
        for (let j = 0; j < n; j++) {

            sum += L[i][j] * Y[j];
        }
        sum = sum - L[i][i] * Y[i];

        Y[i] = ((B[i] - sum) / L[i][i])
        
    }
    for (let i = n-1; i >= 0; i--) {
        let sum = 0;
        for (let j = 0; j < n; j++) {

            sum += U[i][j] * X[j];
        }
        sum = sum - U[i][i] * X[i];

        X[i] = ((Y[i] - sum) / U[i][i])

    }
    
  
    //X.map((x, i) => arr.push({ key: i, x: 'X' + (i + 1), valuex: x.toFixed(5) }))
    X.map((x,i) => arr.push(<div>x{i+1}= {x.toFixed(15)}</div>))
    






    return arr
}

export function calJacobi(n, initialMatrix1, initialMatrix2,initialError) {

    let check = true;
    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    let error = initialError

  
    
    let arr = []
    
    let resultX = []
    let ansX = []
    
    let arr_Error = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)


    for(let i = 0 ; i < n ;i++){
        resultX.push(0)
        
    }
    
    while(check){

       
        
        
        for(let i = 0;i <  n ;i++){
            let sum = matrix2[i]
            for(let j = 0;j < n;j++){
                if(i != j){
                    
                   
                    sum = (sum- (matrix1[i][j]*resultX[j]))
                    
                    
                    
                }
                
            }
            
            
            ansX[i] = sum/matrix1[i][i];
            
            
          
            arr_Error[i] = math.abs((ansX[i]-resultX[i])/ansX[i])
            
            console.log(arr_Error[i])
            
           
        }
        resultX = [...ansX]
        check = false
        for(let i = 0 ; i < n ; i++){
            if(arr_Error[i] > error){
               check = true
               break;
            }
          
            
        }
       
    
    }
    for(let i = 0 ; i < n ; i++){
        //arr.push({key : i , x : 'X'+(i+1) , valuex : resultX[i].toFixed(5)})
        arr.push(<div>X{i+1}={resultX[i].toFixed(15)}</div>)
    }
     

        
    return arr
}

export function calSeidel(n, initialMatrix1, initialMatrix2,initialError) {

    let check = true;
    let matrix1=initialMatrix1
    let matrix2=initialMatrix2
    
    let error = initialError

  
    
    let arr = []
    
    let resultX = []
    let ansX = []
    
    let arr_Error = []
    for(let i = 0 ; i < n ;i++){
        resultX.push(0)
        
    }
    
    while(check){

       
        
        
        for(let i = 0;i <  n ;i++){
            let sum = matrix2[i]
            for(let j = 0;j < n;j++){
                if(i != j){
                    
                   
                    sum = (sum- (matrix1[i][j]*resultX[j]))
                    
                    
                    
                }
                
            }
            
            
            ansX[i] = sum/matrix1[i][i];
            
            
          
            arr_Error[i] = math.abs((ansX[i]-resultX[i])/ansX[i])
            resultX[i] = ansX[i]
            console.log(arr_Error[i])
            
           
        }
        resultX = [...ansX]
        check = false
        for(let i = 0 ; i < n ; i++){
            if(arr_Error[i] > error){
               check = true
               break;
            }
          
            
        }
       
    
    }
    for(let i = 0 ; i < n ; i++){
        //arr.push({key : i , x : 'X'+(i+1) , valuex : resultX[i].toFixed(5)})
        arr.push(<div>X{i+1}={resultX[i].toFixed(15)}</div>)
    }
     

        
    return arr
}


export function calConjugate(n, initialMatrix1, initialMatrix2,initialError) {

    
    let A = initialMatrix1

    let B = initialMatrix2
    
    let error = initialError

  
    
    let arr = []
    
    let X = []
    
    let K = 0;
    
    let checkError = 9999

    for(let i = 0 ; i < n ;i++){
       X.push(0)
        
    }
    
    let R = math.multiply(A,X);
    R = math.subtract(R,B);
    let D = math.multiply(R,-1);
    
    let lambda = null;

    let alpha = null; 

    while(checkError > error){

        lambda = math.transpose(D);
        let temp = lambda;
        lambda = math.multiply(lambda, R);
        temp = math.multiply(temp, A);
        temp = math.multiply(temp, D);

        lambda = lambda / temp;

        lambda = math.multiply(lambda, -1);

        temp = math.multiply(lambda, D);
        X = math.add(X, temp);

        temp = math.multiply(A, X);
        R = math.subtract(temp, B);

        temp = math.transpose(R);
        temp = math.multiply(temp, R);

        checkError = math.sqrt(temp);

        alpha = math.transpose(R);
        alpha = math.multiply(alpha, A);
        alpha = math.multiply(alpha, D);

        temp = math.transpose(D);
        temp = math.multiply(temp, A);
        temp = math.multiply(temp, D);

        alpha = alpha / temp;

        temp = math.multiply(alpha, D);
        D = math.multiply(R, -1);
        D = math.add(D, temp);

       K++;
         
        
        
        
      
    for(let i = 0 ; i < n ; i++){
        //arr.push({key : i , x : 'X'+(i+1) , valuex : X[i].toFixed(5)})
        arr.push(<div className ="result">X{i+1}={X[i].toFixed(15)}</div>)
    }
     

        
    return (arr)
}
}

export function calNewtonInterpolation( initialMatrix1, initialPoint,initialX) {
    let A = initialMatrix1

    let P = initialPoint
   
    let X = initialX

    

    let arr = []
    let ans = []


    ans.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)

   for(let i = 0 ; i < P.length ; i++){
           arr.push(A[parseInt(P[i])-1])
   }
  
   console.log(arr.toString())
   let findX = interpolationQuadratic_Poly_linear(arr)

   

    //ans.push({key :  1 ,fx : 'f('+X+')' , valuex : findX(X) })
    ans.push(<div>f({X})={findX(X)}</div>)
    //ans.push(<div className="result">f({X})={findX(X)}</div>)
    console.log(ans)
   return ans
}

export function calLagrange(initialMatrix1,initialPoint,initialX){
    

    let A = initialMatrix1

    let P = initialPoint
   
    let X = initialX

    

    let arr = []
    let ans = []
    ans.push(<div className = "ontopresult"> คำตอบของการคำนวนคือ</div>)

   
   for(let i = 0 ; i < P.length ; i++){
           arr.push(A[parseInt(P[i])-1])
   }
   console.log(arr)

   //-----------------------------------------------------------//
   let xs = []
   let ys = []

	for(let i = 0 ; i < arr.length ; i++){

		for(let j = 0 ; j < arr.length ; j++){
				if(j == 0){
					xs.push(arr[i][j])
				}
				else if(j == 1){
					ys.push(arr[i][j])
				}
		}
			
	}
    console.log(xs.length)
    console.log(ys.length)
    //--------------------------------------------------------//
    let ws = [];
	let k = xs.length;
	let w;
	
	for (let j = 0; j < k; ++j) {
		w = 1;
		for (var i = 0; i < k; ++i) {
			if (i != j) {
				w *= xs[j] - xs[i];
			}
		}
		ws[j] = 1/w;
	}
 //-----------------------------------------------------------//
    let a = 0;
	let b = 0;
	let c = 0;

	for (let j = 0; j < xs.length; ++j) {
		
		if (X != xs[j]) {
			
			a = ws[j] / (X - xs[j]);
			b += a * ys[j];
			c += a;
		} else {
            //ans.push({key :  1 ,fx : 'f('+X+')' , valuex : ys[j] })
            ans.push(<div className = "result">f({X}) = {ys[j]}</div>)
			return ans;
            
			
		}
	}
	


    //ans.push({key :  1 ,fx : 'f('+X+')' , valuex : (b/c).toFixed(5) })
    ans.push(<div className ="result">f({X}) = {(b/c).toFixed(5)}</div>)
	

    return ans

} 

 export function calSpline(initialMatrix1,initialX){
    

    let arr = initialMatrix1

   
   
    let X = initialX

    

    
    let ans = []

  

   //-----------------------------------------------------------//
   let xs = []
   let ys = []


   arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
	for(let i = 0 ; i < arr.length ; i++){

		for(let j = 0 ; j < arr.length ; j++){
				if(j == 0){
					xs.push(arr[i][j])
				}
				else if(j == 1){
					ys.push(arr[i][j])
				}
		}
			
	}

    const spline = new Spline(xs,ys)
    

    //ans.push({key :  1 ,fx : 'f('+X+')' , valuex : spline.at(X) })
	ans.push(<div className ="result" >F({X}) = {spline.at(X)}</div>)

    return ans

} 

export function calLinear(initialMatrix1,initialX,n){
    
    let arr = initialMatrix1
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 2 ; j ++){
            arr[i][j] = parseInt(arr[i][j])
        }
    }

    const result = regression.linear(arr);
    let X = initialX
    const gradient = parseFloat(result.equation[0]);
    const yIntercept = parseFloat(result.equation[1]);
    console.log(arr)
    console.log(X)
     console.log(gradient)
     console.log(yIntercept)
    let ans = []
    ans.push(<div className = "ontopresult"> คำตอบของการคำนวนคือ</div>)
    //ans.push({key :  1 ,fx : 'f('+X+')' , valuex : (yIntercept + (gradient*X)).toFixed(5) })
	ans.push(<div className ="result">f({X}) = {(yIntercept + (gradient*X)).toFixed(5)}</div>)

    return ans

}

export function calPolynoial(initialMatrix1,initialX,n){
    
    let arr = initialMatrix1
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 2 ; j ++){
            arr[i][j] = parseInt(arr[i][j])
        }
    }

    
   
    const result = regression.polynomial(arr);
    let X = initialX
    const a0 = parseFloat(result.equation[0]);
    const a1 = parseFloat(result.equation[1]);
    const a2 = parseFloat(result.equation[2]);
    console.log(a0)
    console.log(a1)
    console.log(a2)

    let ans = [] 
    
    let fx = a0+(a1*X)+(a2*(X*X))
    ans.push(<div className = "ontopresult"> คำตอบของการคำนวนคือ</div>)
    //ans.push({key :  1 ,fx : 'f('+X+')' , valuex : fx.toFixed(5) })
    //ans.push(<div>f({X}) = {fx.toFixed(5)}</div>)
    ans.push(<div>{'f( '+X+' ) = '} {fx.toFixed(5)}</div>)
    return ans

}

export function calMultiple(initialN,initialMatrix1,initialX1,initialX2,initialX3){
    
    let n = initialN;
    let X1 = initialX1
    let X2 = initialX2
    let X3 = initialX3
    let A = initialMatrix1
    
    for(let i = 0 ; i < n ; i++){
        for(let j = 0 ; j < 4 ; j ++){
            A[i][j] = parseInt(A[i][j])
        }
    }
      let x1 = []
      let x2 = []
      let x3 = []
      let y = []
      let sumx1 = 0
      let sumx2 = 0
      let sumx3 = 0
      let sumy  = 0
      for(let i = 0; i < n ; i++){
          for(let j = 0 ; j < 4 ; j++){
              if(j == 0){
                x1.push(A[i][j])
                
                 sumx1 +=  A[i][j]
                
              }
              else if(j == 1){
                x2.push(A[i][j])
               
                sumx2 +=  A[i][j]
                
              }
              else if(j == 2){
                x3.push(A[i][j])
                 sumx3 +=  A[i][j]
                
              }
              else if(j == 3){
                y.push(A[i][j])
                 sumy += A[i][j]
               
              }
          }
      }
    
       console.log(x1.toString())
       console.log(x2.toString())
       console.log(x3.toString())
       console.log(y.toString())
       console.log(sumx1)
       console.log(sumx2)
       console.log(sumx3)
       console.log(sumy)
      function cal(matrix1,matrix2){
        let summ = 0
        for(let i = 0 ; i< n ; i++){
             summ += (matrix1[i]*matrix2[i])
        }
        return summ;
      }
    
      let Xx = []
      
      Xx.push(x1)
      Xx.push(x2)
      Xx.push(x3)
      Xx.push(y)
      let arrSum = []
      arrSum.push(sumx1)
      arrSum.push(sumx2)
      arrSum.push(sumx3)
      arrSum.push(sumy)     
    let B = []
    
    for (let i = 0; i < 4; i++) {
      B.push([])
      for (let j = 0; j < 4+1; j++) {
        
        if (i == 0 && j == 0) {
          B[i][j] = 7
        }
        else if(i == 0){
          
           
          
            B[i][j] = arrSum[j-1]
          
         
        }
        else if(j == 0){
          B[i][j] = arrSum[i-1]
        }
        else{
          
          
            B[i][j] = cal(Xx[i-1], Xx[j-1])
          
         
          
        }
        
    
    
        }
    
      }
      console.log(B)
      

      
    let matrix1=B
    
    
    
    
    let arr = []
    let X = []
    arr.push(<div className="ontopresult"> คำตอบของการคำนวนคือ</div>)
    
    for(let i = 0 ; i < 4 ; i++){
       
        X.push(1)
    }
    console.log(matrix1)
   
    for(let i = 1;i < 4 ; i++){
        for(let j = i ;j < 4 ; j++){

            let divide = matrix1[i-1][i-1]
            let multi = matrix1[j][i-1]

            for(let k = i-1 ; k < 4+1;k++){
                matrix1[j][k] = matrix1[j][k] - ((matrix1[i-1][k]/divide)*multi)
                
            }
    
        }
         
    }

    for(let i = 4-1 ;i >= 0 ; i--){
        let sum = 0;
        for(let j = 0 ; j < 4 ;j++){
            sum = sum + matrix1[i][j]*X[j];
        }
        sum = sum - matrix1[i][i]
        X[i] = ((matrix1[i][4] - sum)/matrix1[i][i])
        
    }
    console.log(X[0])
    console.log(X[1])
    console.log(X[2])
    console.log(X[3])

    

    let fX = X[0] + X[1]*X1+X[2]*X2+X[3]*X3

    //arr.push({key :  1 ,fx : 'Y' , valuex : fX.toFixed(5) })
    arr.push(<div>Y = {fX.toFixed(5)}</div>)
    return arr


}