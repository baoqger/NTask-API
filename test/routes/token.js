describe('Routes: Token', () => {
  const Users = app.db.models.Users;
  describe('POST /token', () => {
    beforeEach(done => {
      Users
        .destroy({where: {}})
        .then(() => Users.create({
          name: 'John',
          email: 'john@mail.net',
          password: '12345'
        }))
        .then(() => done());
    });
    describe('Status 200', () => {
      it('returns authenticated user token', done => {
        request.post('/token')
          .send({
            email: 'john@mail.net',
            password: '12345'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.include.keys('token');
            done(err);
          });
      });
    });
    describe('Status 401', () => {
      it('throw error when password is incorrect', done => {
        request.post('/token')
          .send({
            email: 'john@mail.net',
            password: 'WRONG_PASSWORD'
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throw error when email not exist', done => {
        request.post('/token')
          .send({
            email: 'wrong@email.com',
            password: '12345'
          })
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
      it('throw error when email and password are blink', done => {
        request.post('/token')
          .expect(401)
          .end((err, res) => {
            done(err);
          });
      });
    });
  });
});