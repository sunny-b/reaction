require 'test_helper'

class CardsAPITest < ActionDispatch::IntegrationTest
  class PostCardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        @list = List.create(board_id: 1, title: 'My List', position: 1)
      end

      test "creates a new card" do
        assert_equal 0, Card.count

        post "/api/cards",
          params: { card: { title: "My new card", list_id: @list.id, position: 1.0 } },
          headers: { 'Accept' => 'application/json' }

        assert_equal 1, Card.count
      end

      test "returns a 201" do
        post "/api/cards",
          params: { card: { title: "My new card", list_id: @list.id, position: 1.0 } },
          headers: { 'Accept' => 'application/json' }


        assert_response 201
      end

      test "returns an object" do
        new_card = { title: "My new card", list_id: @list.id, position: 1.0 }

        post "/api/cards",
          params: { card: new_card },
          headers: { 'Accept' => 'application/json' }

        assert_match /\{.*\}/, response.body
      end
    end

    class InvalidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        @list = List.create(board_id: 1, title: 'My List', position: 1)
      end

      test "returns a 422" do
        post "/api/cards",
          params: { card: { title: '', list_id: @list.id } },
          headers: { 'Accept' => 'application/json' }

        assert_response 422
      end

      test "returns a 404 if list doesn't exist" do
        post "/api/cards",
          params: { card: { title: 'test', list_id: 1999 } },
          headers: { 'Accept' => 'application/json' }

        assert_response 404
      end

      test "returns 404 error if card doesn't exist" do
        patch "/api/cards/1000000",
          params: { card: { title: "fake" } },
          headers: { 'Accept' => 'application/json'}

        assert_response 404
      end
    end
  end

  class PatchCardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        @list = List.create(board_id: 1, title: 'My List', position: 1)
        @card = Card.create(id: 1, list_id: @list.id, title: 'old card', position: 1)
      end

      test "edits card name" do
        patch "/api/cards/1",
          params: { card: { title: "new card" } },
          headers: { 'Accept' => 'application/json' }

        assert_equal "new card", Card.find(1).title
      end

      test "returns a 200" do
        patch "/api/cards/1",
          params: { card: { title: "new card" } },
          headers: { 'Accept' => 'application/json' }

        assert_response 200
      end


      test "returns a json card object" do
        patch "/api/cards/1",
          params: { card: { title: "new card" } },
          headers: { 'Accept' => 'application/json' }

        assert_match /\{.*\}/, response.body
      end
    end
  end

  class GetCardsTest < ActionDispatch::IntegrationTest
    class ValidDataTest < ActionDispatch::IntegrationTest
      def setup
        Board.create(id: 1, title: 'New Board')
        @list = List.create(board_id: 1, title: 'My List', position: 1)
        @card = Card.create(id: 1, list_id: @list.id, title: 'My Card', position: 1)
      end

      test "returns a json object" do
        get "/api/cards/1",
          headers: { 'Accept' => 'application/json' }
        assert_match /\{.*\}/, response.body
      end

      test "returns correct card" do
        get "/api/cards/1",
          headers: { 'Accept' => 'application/json' }
        assert_includes response.body, @card.title
      end

      test "returns 404 error if card doesn't exist" do
        get "/api/cards/1000000",
          headers: { 'Accept' => 'application/json'}

        assert_response 404
      end
    end
  end
end
