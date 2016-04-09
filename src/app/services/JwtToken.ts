export class JwtToken {
  static get() {
    let jwtString = ls.getItem('jwt');
    if (jwtString) {
      try {
        var jwt = JSON.parse(jwtString);
        jwt.created = new Date(jwt.created);
        var validTill = new Date(jwt.created.getTime() + jwt.ttl * 1000);
        if (jwt.userId && validTill > new Date()) {
          return jwt.id;
        }
      }
      finally {
      }
    }
    return null;
  }
}
