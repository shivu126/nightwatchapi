require('dotenv').config();
import request from '../config/common';
import { expect } from 'chai';
import base from '../config/base';

const {
    createBoard,
    createList,
    deleteCard,
    checkBoardExist,
    checkListExist,
} = require('../prerequisites/board');

const TOKEN = process.env.TOKEN;
const key = process.env.key;

describe('Get card details by ID', () => {

    let cardName, cardID, boardID, listID;

    /**
     * Before execution checkBoardExist() will check the id in the base file if the id is not 
     * exist or not valid createBoard will happen similarly checkListExist() will validate the list id in base
     * if its not exist or not valid createList will create the list
     */
    before(async () => {
        boardID = await checkBoardExist();
        listID = await checkListExist();
    });

    after(() => {
        // delete a card
        deleteCard();
    });

    it('Create new card', async () => {
        cardName = base.cardName;
        if (cardName==''||cardName==null) {
            cardName = 'New card from API';
        }
        const res = await request.post(`/cards?key=${key}&token=${TOKEN}&idList=${listID}&name=${cardName}`);
        console.log(res.body);
        console.log(res.body.name);
        expect(res.body.name).to.eql(cardName);
        cardID = res.body.id;
    });

    it('Verify card is created successfully', () => {
        return request.get(`/cards/${cardID}?key=${key}&token=${TOKEN}&idList=${listID}`).then((res) => {
            console.log(res.body);
            expect(res.body.name).to.eql(cardName);
        });
    });
});