import React, {useState} from 'react';

const Counter = () => {
    let arr = useState(5);
    let data = arr[0];
    let setData = arr[1];


    console.log("Counter rendered")

    return (
        <div onClick={() => setData(data + 1)}>{data}</div>
    );
};

export default Counter;