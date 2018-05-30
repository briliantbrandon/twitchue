var client_id = config.client_id;
var redirect_uri = config.redirect_uri;
var scope = config.scope;

function getAuthUrl() {
    sessionStorage.OAuth_state = '';

    var url = 'https://id.twitch.tv/oauth2/authorize' + 
        '?response_type=token' +
        '&client_id' + client_id + 
        '&redirect_uri' + redirect_uri +
        '&state=' + sessionStorage.OAuth_state + 
        '&scope=' + scope;

    return url;
}