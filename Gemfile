# frozen_string_literal: true
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?('/')
  "https://github.com/#{repo_name}.git"
end

ruby '2.3.3'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.0.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.0'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
# gem 'jquery-rails'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
# gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use dotenv for environment variables management
gem 'dotenv-rails'
# Use responders for using respond_to and respond_with placeholder methods
gem 'responders'
# Use iTunes for searching data on the iTunes store
gem 'itunes'
# Use Kaminari as paginator
gem 'kaminari'
# Use HTTParty as the HTTP client
gem 'httparty'
# Use fog-google for Google Cloud Platform
gem 'fog-google'
# Use pry-rails for Pry initializer
gem 'pry-rails'
# Use mime-types to look up the likely MIME type definitions
gem 'mime-types'

# Use normalize.css for HTML element and attribute style-normalizations
gem 'rails-assets-normalize.css', source: 'https://rails-assets.org'
# Use sprockets-es6 as ES6 transformer
gem 'sprockets-es6'
# Use react_on_rails for integrating Ruby on Rails with modern JavaScript tooling and libraries
gem 'react_on_rails', '~> 6'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platform: :mri
  # Use rspec-rails as the testing framework
  gem 'rspec-rails'
  # Use pry-remote for connecting to Pry remotely
  gem 'pry-remote'
  # Use RuboCop for Ruby code analysis
  gem 'rubocop', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  # gem 'web-console', '>= 3.3.0'
  gem 'listen', '~> 3.0.5'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Use codeclimate-test-reporter uploading Ruby test coverage data to Code Climate
  gem 'codeclimate-test-reporter', '~> 1.0.0'
  # Use simplecov as code coverage analysis tool
  gem 'simplecov'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
