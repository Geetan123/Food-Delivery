  let arr=[1,2,3,3,3,1,1,4,5,5,5]

   let rv=[]

      for(let i=0;i<arr.length;i++){
          for(let j=i+1;j<arr.length;j++){
              if(arr[i]===arr[j]&&!rv.includes(arr[i])){
                 rv.push(arr[i])
              }
          }
      }
       console.log(rv)