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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_17_023648) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "definitions", force: :cascade do |t|
    t.string "content"
    t.string "link"
    t.bigint "subtitle_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["subtitle_id"], name: "index_definitions_on_subtitle_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.string "name", null: false
    t.text "ingredients", null: false
    t.text "instruction", null: false
    t.string "image", default: "https://raw.githubusercontent.com/9jaswag/react_rails_recipe/master/app/assets/images/sample_dish.jpg"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subtitles", force: :cascade do |t|
    t.string "start_time"
    t.string "end_time"
    t.bigint "video_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "content"
    t.index ["video_id"], name: "index_subtitles_on_video_id"
  end

  create_table "videos", force: :cascade do |t|
    t.string "name"
    t.text "src"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "img"
  end

  add_foreign_key "definitions", "subtitles"
  add_foreign_key "subtitles", "videos"
end
