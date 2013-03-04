# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20121118124840) do

  create_table "activities", :force => true do |t|
    t.time     "time"
    t.string   "topic"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
    t.string   "description"
    t.integer  "program_id"
  end

  add_index "activities", ["program_id"], :name => "index_activities_on_program_id"

  create_table "event_registrations", :force => true do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.integer  "event_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "event_tabs", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "event_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "event_tabs", ["event_id"], :name => "index_event_tabs_on_event_id"

  create_table "events", :force => true do |t|
    t.string   "name"
    t.datetime "start_date"
    t.datetime "end_date"
    t.text     "description"
    t.string   "location"
    t.datetime "created_at",          :null => false
    t.datetime "updated_at",          :null => false
    t.string   "banner_file_name"
    t.string   "banner_content_type"
    t.integer  "banner_file_size"
    t.datetime "banner_updated_at"
    t.integer  "user_id"
    t.string   "organizer"
    t.text     "organizer_desc"
    t.string   "venue"
    t.string   "poster_file_name"
    t.string   "poster_content_type"
    t.integer  "poster_file_size"
    t.datetime "poster_updated_at"
  end

  add_index "events", ["user_id"], :name => "index_events_on_user_id"

  create_table "fb_attendee_data", :force => true do |t|
    t.string   "fb_id"
    t.integer  "gender",     :limit => 1
    t.integer  "age",        :limit => 2
    t.datetime "created_at",              :null => false
    t.datetime "updated_at",              :null => false
  end

  add_index "fb_attendee_data", ["fb_id"], :name => "index_fb_attendee_data_on_fb_id", :unique => true

  create_table "fb_attendee_likes", :force => true do |t|
    t.string   "fb_id"
    t.string   "page_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "fb_attendee_likes", ["fb_id"], :name => "index_fb_attendee_likes_on_fb_id"

  create_table "photos", :force => true do |t|
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.integer  "event_id"
    t.string   "content_file_name"
    t.string   "content_content_type"
    t.integer  "content_file_size"
    t.datetime "content_updated_at"
  end

  add_index "photos", ["event_id"], :name => "index_photos_on_event_id"

  create_table "programs", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "event_id"
  end

  add_index "programs", ["event_id"], :name => "index_programs_on_event_id"

  create_table "registration_types", :force => true do |t|
    t.integer  "event_id"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  add_index "registration_types", ["event_id"], :name => "index_registration_types_on_event_id"

  create_table "registrations", :force => true do |t|
    t.integer  "event_id"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.datetime "created_at",           :null => false
    t.datetime "updated_at",           :null => false
    t.string   "fb_id"
    t.integer  "registration_type_id"
  end

  add_index "registrations", ["event_id", "email"], :name => "index_registrations_on_event_id_and_email", :unique => true
  add_index "registrations", ["event_id"], :name => "index_registrations_on_event_id"
  add_index "registrations", ["registration_type_id"], :name => "index_registrations_on_registration_type_id"

  create_table "speakers", :force => true do |t|
    t.string   "name"
    t.string   "position"
    t.string   "description"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.integer  "event_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
  end

  add_index "speakers", ["event_id"], :name => "index_speakers_on_event_id"

  create_table "users", :force => true do |t|
    t.string   "email",                  :default => "", :null => false
    t.string   "encrypted_password",     :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                             :null => false
    t.datetime "updated_at",                             :null => false
    t.string   "name"
    t.string   "uid"
    t.string   "provider"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true
  add_index "users", ["uid"], :name => "index_users_on_uid", :unique => true

end
