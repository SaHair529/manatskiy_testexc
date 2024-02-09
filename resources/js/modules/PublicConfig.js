export class PublicConfig {
    static routes = {
        LogController: {
            store: window.location.origin+'/api/logs/'
        }
    }
}
