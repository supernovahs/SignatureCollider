const { spawn } = require('child_process');

const cmd = spawn('forge', ['inspect','./src/Proxy.sol:Proxy', 'methods']);
const imp = spawn('forge', ['inspect','./src/Implementation.sol:Implementation', 'methods']);

var GotProxyEvent = false;
var GotImplementationEvent = false;
var cmdarray = [];
var cmdarraykey = [];
var imparray = [];
var imparraykey = [];
// Listen for data events from the command output
cmd.stdout.on('data', (data) => {
    console.log(`${ data}`);
    data = JSON.parse(data);
    const key = Object.keys(data);
    const val = Object.values(data);
    console.log("val",val);
    cmdarray = val;
    cmdarraykey = key;
});

// Listen for errors
cmd.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// Listen for the process to close
cmd.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    GotProxyEvent = true;
});


imp.stdout.on('data', (impl) => {
    console.log(`${ impl}`);
        impl = JSON.parse(impl);
        const keyb = Object.keys(impl);
        const val = Object.values(impl);
        console.log("val11",val);
        imparray = val;
        imparraykey = keyb;
    });

     // Listen for errors
  imp.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  // Listen for the process to close
  imp.on('close', (code) => {
      console.log(`impl child process exited with code ${code}`);
      GotImplementationEvent = true;
});


const CheckCollision = async ( ) =>{
    console.log("check111");
    if(GotProxyEvent && GotImplementationEvent){
        console.log("getting");
        let length = cmdarray.length < imparray.length ? cmdarray.length : imparray.length;
        let upperlen = length == cmdarray.length ? imparray.length : cmdarray.length;
        let smaller = cmdarray.length > imparray.length ? "imp" : "cmd";
        for(let z = 0 ; z < upperlen;z++){   
        for(let i = 0 ; i < length; i++ ){
            if(smaller == "imp"){
                if(imparray[i] == cmdarray[z]){
                    console.log(`Collision at ${imparraykey[i] } and ${cmdarraykey[z]}`);
                }
            }
            else{
                if(cmdarray[i] == imparray[z]){
                    console.log(`Collision at ${imparraykey[z] } and ${cmdarraykey[i]}`);
                }
            }
        }
    }
    }
    else{
        // Delay in milliseconds before calling CheckCollision again
        const delay = 1000; // 1 second

        // Use setTimeout to wait for the specified delay
        await new Promise(resolve => setTimeout(resolve, delay));

        // Call CheckCollision again
        await CheckCollision();
    }
}

CheckCollision();


