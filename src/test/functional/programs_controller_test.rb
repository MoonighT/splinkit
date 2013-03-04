require 'test_helper'

class ProgramsControllerTest < ActionController::TestCase
  setup do
    @event = events(:one)
    @program = programs(:one)
    @event.programs = [@program]
    @update = {
      name: "first day"
    }
    @activity = activities(:one)
    @program.activities = [@activity]
  end

  test "should get index" do
    get :index, format: :json, event_id: @event
    assert_response :success
    body = JSON.parse(@response.body)
    assert_equal(1, body.count)
    assert_equal(@program.name, body[0]["name"])
  end

  test "should get new" do
    get :new, format: :json, event_id: @event
    assert_response :success
  end

  test "should create program" do
    assert_difference('Program.count') do
      post :create, format: :json, event_id: @event, program: @update
    end
    body = JSON.parse(@response.body)
    assert_equal(@update[:name], body["name"])
  end

  test "should show program" do
    get :show, format: :json, id: @program
    assert_response :success
    body = JSON.parse(@response.body)
    assert_equal(@program[:name], body["name"])
    # assert_equal(1, body["activities"].count)
  end

  test "should update program" do
    put :update, format: :json, id: @program, program: @update
    assert_response :success
  end

  test "should destroy program" do
    assert_difference('Program.count', -1) do
      delete :destroy, format: :json, id: @program
    end
    assert_response :success
  end
end
