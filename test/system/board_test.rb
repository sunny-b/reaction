require "application_system_test_case"

class BoardTest < ApplicationSystemTestCase
  test "displaying no lists" do
    create(:board)
    visit board_path(1)

    assert_selector ".new-list", count: 1
    assert_selector ".new-list", text: "Add a list..."
  end

  test "displaying 1 list" do
    create(:board, id: 1)
    create(:list, board_id: 1)
    visit board_path(1)

    assert_selector ".list-wrapper", count: 1
  end

  test "displaying 1 card in a list" do
    create(:board, id: 1)
    create(:list, id: 2, board_id: 1, position: 2.0)
    create(:card, list_id: 2)
    visit board_path(1)

    assert_selector ".list-wrapper .card", count: 1
  end

  test "displaying 2 cards in a correct list" do
    create(:board, id: 1)
    create(:list, id: 1, board_id: 1, position: 1.0)
    create(:list, id: 2, board_id: 1, position: 2.0)
    create(:card, list_id: 2)
    create(:card, list_id: 2)
    visit board_path(1)

    assert_selector ".list-wrapper:nth-of-type(2) .card", count: 2
  end

  class NewListTileTest < ApplicationSystemTestCase
    test "it can be toggled" do
      create(:board)
      visit board_path(1)

      refute_selector ".new-list.selected"

      find("#new-list span").click

      assert_selector ".new-list.selected"

      find(".x-icon").click

      refute_selector ".new-list.selected"
    end
  end
end
