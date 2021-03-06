import reducer from './ListsReducer';
import * as types from '../constants/ActionTypes';

describe("ListsReducer", () => {
  describe("unknown type", () => {
    it("returns the state parameter", () => {
      expect(
        reducer("param value", { type: "FAKE_TYPE_FOR_TEST" })
      ).toEqual("param value");
    });
  });

  describe("FETCH_BOARD_SUCCESS", () => {
    it("returns empty array from action.board value with no lists", () => {
      expect(
        reducer([], {
          type: types.FETCH_BOARD_SUCCESS,
          board: { id: 1, title: "My board", lists: [] }
        })
      ).toEqual([]);
    });
  });

  describe("FETCH_BOARD_SUCCESS", () => {
    it("returns just lists from action.board value", () => {
      expect(
        reducer([], {
          type: types.FETCH_BOARD_SUCCESS,
          board: { id: 1, title: "My board", lists: [{ id: 1, title: "My list" }, { id: 2, title: "My second list" }] }
        })
      ).toEqual([{ id: 1, title: "My list" }, { id: 2, title: "My second list" }]);
    });
  });

  describe("CREATE_LIST_SUCCESS", () => {
    it("returns the current state with the `list` action value concatenated", () => {
      const list1 = { id: 1, title: "Old list", board_id: 1 };
      const list2 = { board_id: 1, id: 2, title: "New list", position: 1.0 }

      expect(
        reducer([list1], {
          type: types.CREATE_LIST_SUCCESS,
          list: list2,
        })
      ).toEqual([list1, list2]);
    });
  });

  describe("UPDATE_LIST_SUCCESS", () => {
    it("returns the current state with the `title` attribute updated on the correct list object", () => {
      const oldList = { id: 1, title: "Old list", board_id: 1 };
      const newList = { id: 1, title: "New list", board_id: 1 };

      expect(
        reducer([oldList], {
          type: types.UPDATE_LIST_SUCCESS,
          list: newList,
        })
      ).toEqual([newList]);
    });

    it("returns the current state with the `position` attribute updated on the correct list object", () => {
      const oldList = { id: 1, title: "Old list", board_id: 1, position: 1.0 };
      const newList = { id: 1, title: "Old list", board_id: 1, position: 2.0 };

      expect(
        reducer([oldList], {
          type: types.UPDATE_LIST_SUCCESS,
          list: newList,
        })
      ).toEqual([newList]);
    });
  });
});
