import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Button from 'react-bootstrap/Button';

export default class Sp_game extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            board: {},
            rows: 24,
            cols: 10
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.board.size !== this.state.board.size) {
            console.log('hello there')
        }
    };
    
    board_generate_data() {
        var data = {};
        var counter = 0;
        for(let x = 1; x <= this.state.rows; x++) {
            for(let y = 1; y <= this.state.cols; y++) {
                data[counter] = {
                    row: x,
                    col: y,
                    state: "empty", //empty, filled, active
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: false,
                    fill: ""
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

        //clear everything
        ctx.clearRect(0, 0, c.width, c.height);

        //draw cells
        for(var key in this.state.board) {
            this.cell_render(key)
        }

        //draw outline
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, c.height);
        ctx.lineTo(c.width, c.height);
        ctx.lineTo(c.width, 0);
        ctx.lineTo(0, 0)
        ctx.strokeStyle = "black";
        ctx.stroke();
        
        console.log(this.state.board)
    }

    cell_render(cell_id) {
        let cell = this.state.board[cell_id];
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');
        let cell_width = c.width / this.state.cols;
        let cell_height = c.height / this.state.rows;

        let x1 = (cell.col - 1) * cell_width; // 0, 0
        let y1 = (cell.row - 1) * cell_height;
        let x2 = ((cell.col - 1) * cell_width) + cell_width; // 50, 0
        let y2 = (cell.row - 1) * cell_height;
        let x3 = ((cell.col - 1) * cell_width) + cell_width; //50, 50
        let y3 = ((cell.row - 1) * cell_height) + cell_height;
        let x4 = (cell.col - 1) * cell_width; //0, 50
        let y4 = ((cell.row - 1) * cell_height) + cell_height;
        
        //outline
        if(cell.line_top === true) {
            this.draw_line(x1, y1, x2, y2)
        };
        if(cell.line_right === true) {
            this.draw_line(x2, y2, x3, y3)
        };
        if(cell.line_bot === true) {
            this.draw_line(x3, y3, x4, y4)
        };
        if(cell.line_left === true) {
            this.draw_line(x4, y4, x1, y1)
        };

        //fill color
        if(cell.fill !== "") {
            ctx.beginPath();
            ctx.rect(x1, y1, cell_width, cell_height);
            ctx.fillStyle = cell.fill;
            ctx.fill();
        }
        
    }

    draw_line(x, y, x2, y2) {
        let c = document.getElementById('canvas');
        let ctx = c.getContext('2d');
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "black";
        ctx.stroke();
    }

    piece_longboi(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 20;
        var c4 = start_cell_id + 30;
        const { board } = this.state;
        const col = "cyan";

        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: true,
                    fill: col
                }
            }
        });
    }

    piece_mrt(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 11;
        var c4 = start_cell_id + 20;
        const { board } = this.state;
        const col = "purple"

        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "active",
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: true,
                    line_left: false,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: true,
                    fill: col
                }
            }
        });
    }

    piece_phat(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 1;
        var c4 = start_cell_id + 11;
        const { board } = this.state;
        const col = "yellow"
        
        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "active",
                    line_top: true,
                    line_right: false,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "active",
                    line_top: false,
                    line_right: false,
                    line_bot: true,
                    line_left: true,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: false,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: false,
                    fill: col
                }
            }
        });
    }

    piece_l(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 20;
        var c4 = start_cell_id + 21;
        const { board } = this.state;
        const col = "orange"
        
        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "active",
                    line_top: false,
                    line_right: false,
                    line_bot: true,
                    line_left: true,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: true,
                    line_left: false,
                    fill: col
                }
            }
        });
    }

    piece_bkl(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 20;
        var c4 = start_cell_id + 19;
        const { board } = this.state;
        const col = "blue"
        
        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: false,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "active",
                    line_top: true,
                    line_right: false,
                    line_bot: true,
                    line_left: true,
                    fill: col
                }
            }
        });
    }

    piece_s(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 11;
        var c4 = start_cell_id + 21;
        const { board } = this.state;
        const col = "green"
        
        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "active",
                    line_top: false,
                    line_right: false,
                    line_bot: true,
                    line_left: true,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "active",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: false,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "active",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: true,
                    fill: col
                }
            }
        });
    }

    piece_bks(start_cell_id) {
        //cells to modify
        var c1 = start_cell_id;
        var c2 = start_cell_id + 10; 
        var c3 = start_cell_id + 9;
        var c4 = start_cell_id + 19;
        const { board } = this.state;
        const col = "red"
        
        //update cells
        this.setState({
            board: {
                ...board, 
                [c1]: { 
                    ...board[c1],
                    state: "empty",
                    line_top: true,
                    line_right: true,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c2]: { 
                    ...board[c2],
                    state: "empty",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: false,
                    fill: col
                },
                [c3]: { 
                    ...board[c3],
                    state: "empty",
                    line_top: true,
                    line_right: false,
                    line_bot: false,
                    line_left: true,
                    fill: col
                },
                [c4]: { 
                    ...board[c4],
                    state: "empty",
                    line_top: false,
                    line_right: true,
                    line_bot: true,
                    line_left: true,
                    fill: col
                }
            }
        });
    }

    active_down() {
        var active_keys = [];
        var active_cells = {};
        const { board } = this.state;

        //draw cells
        for(var key in board) {
            if(board[key].state === "active") {
                active_keys.push(parseInt(key));
                active_cells[key] = board[key];
            }
        };

        //setState * 8
        this.setState({
            board: {
                ...board,[active_keys[0]]: { 
                    row: board[active_keys[0]].row,
                    col: board[active_keys[0]].col,
                    state: "empty",
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: false,
                    fill: ""
                },
                [active_keys[1]]: {
                    row: board[active_keys[1]].row,
                    col: board[active_keys[1]].col,
                    state: "empty",
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: false,
                    fill: ""
                },
                [active_keys[2]]: {
                    row: board[active_keys[2]].row,
                    col: board[active_keys[2]].col,
                    state: "empty",
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: false,
                    fill: ""
                },
                [active_keys[3]]: {
                    row: board[active_keys[3]].row,
                    col: board[active_keys[3]].col,
                    state: "empty",
                    line_top: false,
                    line_right: false,
                    line_bot: false,
                    line_left: false,
                    fill: ""
                },
                [active_keys[0] + 10]: { 
                    row: board[active_keys[0] + 10].row,
                    col: board[active_keys[0] + 10].col,
                    state: "active",
                    line_top: active_cells[active_keys[0]].line_top,
                    line_right: active_cells[active_keys[0]].line_right,
                    line_bot: active_cells[active_keys[0]].line_bot,
                    line_left: active_cells[active_keys[0]].line_left,
                    fill: active_cells[active_keys[0]].col
                },
                [active_keys[1] + 10]: {
                    row: board[active_keys[1] + 10].row,
                    col: board[active_keys[1] + 10].col,
                    state: "active",
                    line_top: active_cells[active_keys[1]].line_top,
                    line_right: active_cells[active_keys[1]].line_right,
                    line_bot: active_cells[active_keys[1]].line_bot,
                    line_left: active_cells[active_keys[1]].line_left,
                    fill: active_cells[active_keys[1]].col
                },
                [active_keys[2] + 10]: {
                    row: board[active_keys[2] + 10].row,
                    col: board[active_keys[2] + 10].col,
                    state: "active",
                    line_top: active_cells[active_keys[2]].line_top,
                    line_right: active_cells[active_keys[2]].line_right,
                    line_bot: active_cells[active_keys[2]].line_bot,
                    line_left: active_cells[active_keys[2]].line_left,
                    fill: active_cells[active_keys[2]].col
                },
                [active_keys[3] + 10]: {
                    row: board[active_keys[3] + 10].row,
                    col: board[active_keys[3] + 10].col,
                    state: "active",
                    line_top: active_cells[active_keys[3]].line_top,
                    line_right: active_cells[active_keys[3]].line_right,
                    line_bot: active_cells[active_keys[3]].line_bot,
                    line_left: active_cells[active_keys[3]].line_left,
                    fill: active_cells[active_keys[3]].col
                }
            }
        }, () => {
            this.board_render();
        });
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
            <Button variant="success" onClick={() => this.board_render()}>render board</Button>
            <br></br>
            <br></br>
            <Button variant="primary" onClick={() => this.piece_longboi(4)}>input longboi</Button>
            <Button variant="primary" onClick={() => this.piece_mrt(4)}>input mrt</Button>
            <Button variant="primary" onClick={() => this.piece_phat(4)}>input phat</Button>
            <Button variant="primary" onClick={() => this.piece_l(4)}>input l</Button>
            <Button variant="primary" onClick={() => this.piece_bkl(5)}>input bkl</Button>
            <Button variant="primary" onClick={() => this.piece_s(4)}>input s</Button>
            <Button variant="primary" onClick={() => this.piece_bks(5)}>input bks</Button>
            <br></br>
            <br></br>
            <Button variant="primary" onClick={() => this.active_down()}>active down 1</Button>
            <br></br>
            <br></br>
            <canvas id="canvas" width="250" height="600"></canvas>;
            </>
        );
    }
}