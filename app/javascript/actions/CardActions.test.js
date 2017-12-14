import React from 'react';

import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

import apiClient from '../lib/ApiClient.js';
jest.mock('../lib/ApiClient');

import * as actions from './CardActions';
import * as types from '../constants/ActionTypes';
import * as statuses from '../constants/Statuses';

describe("Card actions", () => {
  let store;

  beforeEach(() => {
    store = mockStore();
  });

  afterEach(() => {
    apiClient.getBoards.mockClear();
    apiClient.createBoard.mockClear();
    store.clearActions()
  });

  describe("createCardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.createCardRequest()
      ).toEqual({ type: types.CREATE_CARD_REQUEST });
    });
  });

  describe("createCardSuccess", () => {
    it("returns the correct object", () => {
      const card = { id: 1, title: "my card", list_id: 1 };

      expect(
        actions.createCardSuccess(card)
      ).toEqual({ type: types.CREATE_CARD_SUCCESS, card });
    });
  });

  describe("updateCardRequest", () => {
    it("returns the correct object", () => {
      expect(
        actions.updateCardRequest()
      ).toEqual({ type: types.UPDATE_CARD_REQUEST });
    });
  });

  describe("updateCardSuccess", () => {
    it("returns the correct object", () => {
      const card = { id: 1, title: "my card", list_id: 1 };

      expect(
        actions.updateCardSuccess(card)
      ).toEqual({ type: types.UPDATE_CARD_SUCCESS, card });
    });
  });
});
