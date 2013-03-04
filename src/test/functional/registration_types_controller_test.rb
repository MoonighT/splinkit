require 'test_helper'

class RegistrationTypesControllerTest < ActionController::TestCase
  setup do
    @registration_type = registration_types(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:registration_types)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create registration_type" do
    assert_difference('RegistrationType.count') do
      post :create, registration_type: { event_id: @registration_type.event_id, name: @registration_type.name }
    end

    assert_redirected_to registration_type_path(assigns(:registration_type))
  end

  test "should show registration_type" do
    get :show, id: @registration_type
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @registration_type
    assert_response :success
  end

  test "should update registration_type" do
    put :update, id: @registration_type, registration_type: { event_id: @registration_type.event_id, name: @registration_type.name }
    assert_redirected_to registration_type_path(assigns(:registration_type))
  end

  test "should destroy registration_type" do
    assert_difference('RegistrationType.count', -1) do
      delete :destroy, id: @registration_type
    end

    assert_redirected_to registration_types_path
  end
end
