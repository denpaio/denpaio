# frozen_string_literal: true

source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '2.5.8'

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.1'
# Use postgresql as the database for Active Record
gem 'pg', '~> 0.18'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
# gem 'coffee-rails', '~> 4.2'
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
# Use redis-rails for Rails cache stores
gem 'redis-rails'
# Use has_scope for mapping incoming controller parameters to named scopes
gem 'has_scope'
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
# Use jwt for JSON Web Token (JWT)
gem 'jwt'

# Use normalize.css for HTML element and attribute style-normalizations
gem 'rails-assets-normalize.css', source: 'https://rails-assets.org'
# Use sprockets-es6 as ES6 transformer
gem 'sprockets-es6'
# Use Rollbar as an error tracking service
gem 'rollbar'

# Use react_on_rails for integrating Ruby on Rails with modern JavaScript tooling and libraries
gem 'react_on_rails', '8.0.6'

gem 'webpacker_lite'

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and selenium driver
  gem 'capybara', '~> 2.13'
  gem 'selenium-webdriver'
  # Use rspec-rails as the testing framework
  gem 'rspec-rails'
  # Use pry-remote for connecting to Pry remotely
  gem 'pry-remote'
  # Use RuboCop for Ruby code analysis
  gem 'rubocop', require: false
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  # Use RealFaviconGenerator as favicon generator
  gem 'rails_real_favicon'
end

group :test do
  # Use codeclimate-test-reporter uploading Ruby test coverage data to Code Climate
  gem 'codeclimate-test-reporter', '~> 1.0.0'
  # Use simplecov as code coverage analysis tool
  gem 'simplecov'
end
