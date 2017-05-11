[![Build Status](https://travis-ci.org/denpaio/denpaio.svg?branch=master)](https://travis-ci.org/denpaio/denpaio)
[![Code Climate](https://codeclimate.com/github/denpaio/denpaio/badges/gpa.svg)](https://codeclimate.com/github/denpaio/denpaio)
[![Test Coverage](https://codeclimate.com/github/denpaio/denpaio/badges/coverage.svg)](https://codeclimate.com/github/denpaio/denpaio/coverage)

## Dependencies
* A cup of coffee.

## Requirements
* `rbenv -v` # rbenv 1.0.0
* `ruby -v` # ruby 2.3.3p222 (2016-11-21 revision 56859) [x86_64-darwin15]
* `postgres --version` # postgres (PostgreSQL) 9.4.11

## Installation

1. Install Ruby 2.3.3 if you haven't yet:

       $ rbenv install --skip-existing

2. Install the gem dependencies and initialize database:

       $ bin/setup

3. Install Foreman if you haven't yet:

       $ gem install foreman

4. Start the web server:

       $ foreman start -f Procfile.dev

5. Using a browser, go to `http://localhost:3000` and you'll see the home page.

## Testing

    $ rails test

## Contributing
Bug reports and pull requests are welcome.

## License
Denpa Radio is released under the [MIT License](http://opensource.org/licenses/MIT).
