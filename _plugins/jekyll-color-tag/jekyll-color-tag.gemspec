# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "jekyll-color-tag"
  spec.version       = "1.0.0"
  spec.authors       = ["Binyamin Green"]

  spec.summary       = %q{jekyll utility plugin}
  spec.description   = %q{jekyll utility plugin}
  spec.homepage      = "https://github.com/b3u"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.require_paths = ["lib"]

  spec.add_dependency 'jekyll'
  spec.add_development_dependency "bundler", "~> 1.10"
  spec.add_development_dependency "rake", "~> 10.0"
end