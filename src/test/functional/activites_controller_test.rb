require 'test_helper'

class ActivitiesControllerTest < ActionController::TestCase
  setup do
    @event = events(:one)
    @program = programs(:one)
    @activity = activities(:one)
    @program.activities = [@activity]
    @update = {
      topic: "coding",
      time: "2000-01-01T10:20:00Z"
    }
  end

  def assert_equal_activity(expected, actual)
    assert_equal(expected[:topic], actual["topic"])
    assert_equal(expected[:time], actual["time"])
  end

  test "should get index" do
    get :index, format: :json, event_id: @event, program_id: @program
    assert_response :success
    body = JSON.parse(@response.body)
    assert_equal(1, body.count)
    assert_equal_activity(@activity, body[0])
  end

  test "should get new" do
    get :new, format: :json, event_id: @event, program_id: @program
    assert_response :success
  end

  test "should create activity" do
    assert_difference('Activity.count') do
      post :create, format: :json, event_id: @event, program_id: @program,
        activity: @update
    end
    body = JSON.parse(@response.body)
    assert_equal_activity(@update, body)
  end

  test "should show activity" do
    get :show, format: :json, id: @activity
    body = JSON.parse(@response.body)
    assert_equal_activity(@activity, body)
  end

  test "should update activity" do
    put :update, format: :json, id: @activity, activity: @update
    assert_response :success
  end

  test "should destroy activity" do
    assert_difference('Activity.count', -1) do
      delete :destroy, format: :json, id: @activity
    end
    assert_response :success
  end
end
