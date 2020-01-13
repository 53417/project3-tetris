import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default class Sp_game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            board: {},
            rows: 24,
            cols: 10,
        };
    }
    
    board_generate_data() {
        var data = {};
        var counter = 0;
        for(let x = 1; x <= this.state.rows; x++) {
            for(let y = 1; y <= this.state.cols; y++) {
                data[counter] = {
                    row: x,
                    col: y,
                    state: empty, //empty, filled, active
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: false,
                };
                counter += 1
            }
        };
        this.setState({
            board: data,
        });
        console.log(this.state.board)
    }

    board_render() {
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');
        let tileWidth = c.width / this.state.cols;
        let tileHeight = c.height / this.state.rows;

        //clear everything
        ctx.clearRect(0, 0, c.width, c.height);

        //draw outline
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, c.height);
        ctx.lineTo(c.width, c.height);
        ctx.lineTo(c.width, 0);
        ctx.lineTo(0, 0)
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    //game board is 10 wide and 20 high
    // might make it 24 high to accomodate for beginning
    // do a lose check everytime a new piece is spawned - if any values in first 4 rows = true then = lose
    //new piece spawned auto when 1 piece is confirm dropped
    // determine lines of pieces when being thrown down, ignore after placed to achieve cultris look

    render() {
        return(
            <>
            <h1>SinglePlayer</h1>
            <Button variant="primary" onClick={() => this.board_generate_data()}>generate board data</Button>
            <Button variant="primary" onClick={() => this.board_render()}>render board</Button>
            <br></br>
            <br></br>
            <canvas id="canvas" width="250" height="600"></canvas>
            </>
        );
    }
}