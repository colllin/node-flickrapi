module.exports = (function() {
  "use strict";

  var open = require("open"),
      prompt = require("prompt"),
      ExchangeTokens = require("./exchange");

  /**
   * Second part of oauth: request authorization
   */
  var RequestAuthorization = function(options, requestCompleted) {
    options.permissions = options.permissions || "read";
    var oauth_token = options.oauth_token,
        oauth_token_secret = options.oauth_token_secret,
        authURL = "http://www.flickr.com/services/oauth/authorize";
    open(authURL + "?oauth_token=" + oauth_token + "&perms=" + options.permissions);
    prompt.start();
    prompt.get(['oauth_verifier'], function(err, res) {
      options.oauth_verifier = res.oauth_verifier.trim();
      new ExchangeTokens(options, requestCompleted);
    });
  };

  return RequestAuthorization;
}());