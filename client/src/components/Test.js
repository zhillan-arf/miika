import React from 'react';
import Sidebar from "./Sidebar.js";
import ChatHeader from "./ChatHeader";

const Test = () => {
    return (
        <div style={{display: 'flex', 'flex-direction': 'row'}}>
            <Sidebar>
                <div style={{'margin-top': '4em', 'font-size': '16px'}}>Day 1</div>
                <div style={{'margin-top': '1em', 'font-size': '16px'}}>Day 2</div>
            </Sidebar>
            <div style={{flexGrow: 1, position: 'relative', display: 'flex', 'flex-direction': 'column'}}>
                <ChatHeader />
                <div style={{'margin-top': '4em', 'font-size': '16px'}}>
                    Hello, world!
                </div>
            </div>
        </div>
    );
}

export default Test;