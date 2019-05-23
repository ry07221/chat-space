# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------| 
|Name|string|index: true, null: false, unique: true|
|Email|string|null: false|

### Association
- has_many :groups, through: :emmbers
- has_many :members
- has_many :messaes

## grouopsテーブル
|Column|Type|Options|
|------|----|-------| 
|name|string|

### Association
- has_many :members
- has many :users, through: :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------| 
|text|string|
|image|string|
|user_id|integer|null: false,  foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
