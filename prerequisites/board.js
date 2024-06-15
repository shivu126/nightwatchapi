require('dotenv').config();
import request from '../config/common';
import base from '../config/base';


const TOKEN = process.env.TOKEN;
const key = process.env.key;
const {
    cardID,
} = require('../test/createcard');
let boardName, listName, boardID, listID;

export const createBoard = async () => {
    boardName = base.boardName;
    if (boardName=='' || boardName==null) {
        boardName = 'New board from API';
    } else {
        boardName =  base.boardName
    }
    const res = await request.post(`/boards?key=${key}&token=${TOKEN}&name=${boardName}`);
    console.log(res.body);
    boardID = res.body.id;
    console.log(boardID);
    return boardID;
}

export const createList = async () => {
    listName = base.listName;
    if (listName==''||listName==null) {
        listName = "New List name";
    }
    const res = await request.post(`/boards/${boardID}/lists?key=${key}&token=${TOKEN}&name=${listName}`);
    console.log(res.body);
    listID = res.body.id;
    console.log('List id is: ' + listID)
    return listID;
}

export const checkBoardExist = async () => {
    if (base.boardID == null || base.boardID == '') {
        console.log('boardID not found need to create new boardID');
        boardID = createBoard();
    } else {
        const res = await request.get(`/boards/${base.boardID}?key=${key}&token=${TOKEN}`);
        console.log(res.body);
        let statusCode = res.status;
        console.log('Status code for board is: ' + statusCode);
        if (statusCode == 200) {
            console.log('Status code is: ' + statusCode + ' We can continue');
            boardID = base.boardID;
        } else {
            boardID = createBoard();
        }

    }
    return boardID;
}

export const checkListExist = async () => {
    if (base.listID == null || base.listID == '') {
        console.log('listID not found need to create new list ID');
        listID = createList();
    } else {
        const res = await request.get(`/lists/${base.listID}?key=${key}&token=${TOKEN}&name=${listName}`);
        console.log(res.body);
        let statusCode = res.status;
        console.log('Status code for list is: ' + statusCode);
        if (statusCode == 200) {
            console.log('Status code is: ' + statusCode + ' We can continue');
            listID = base.listID;
        } else {
            listID = createList();
        }
    }
    return listID;
}

export const deleteCard = async () => {
    console.log('Card id to delete: ' + cardID)
    const res = await request
        .delete(`lists/${listID}/archiveAllCards?key=${key}&token=${TOKEN}`);
    let status = res.status;
    console.log("card deleted successfully " + status);
    return status;
}
