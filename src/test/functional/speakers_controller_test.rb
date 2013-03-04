require 'test_helper'

class SpeakersControllerTest < ActionController::TestCase

  setup do
    @event = events(:one)
    @speaker = speakers(:one)
    @update = {
      name: "Ben",
      position: "prof",
      description: "evil prof"
    }
  end

  def assert_equal_speaker(expected, actual)
    assert_equal(expected[:name], actual["name"])
    assert_equal(expected[:position], actual["position"])
    assert_equal(expected[:description], actual["description"])
  end

  test "should get index" do
    get :index, event_id: @event, format: :json
    assert_response :success
    assert_not_nil assigns(:speakers)
  end

  test "should get new" do
    get :new, event_id: @event
    assert_response :success
  end

  test "should create speaker" do
    assert_difference('Speaker.count') do
      post :create, format: :json, event_id: @event, speaker: @update
    end
    body = JSON.parse(@response.body)
    assert_equal_speaker(@update, body)
  end

  test "should show speaker" do
    get :show, format: :json, id: @speaker
    body = JSON.parse(@response.body)
    assert_equal_speaker(@speaker, body)
  end

  test "should update speaker" do
    put :update, format: :json, id: @speaker, speaker: {  }
    assert_response :success
  end

  test "should destroy speaker" do
    assert_difference('Speaker.count', -1) do
      delete :destroy, format: :json, id: @speaker
    end

    assert_response :success
  end
end
