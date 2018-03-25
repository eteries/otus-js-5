const {Readable, Writable, Transform} = require('stream');

const random100 = () => Math.ceil(Math.random() * 100);

const random = new Readable({
  read() {
    this.push(random100() + '');
  },
  highWaterMark: 2
});

const randomize = new Transform({
  transform(chunk, encoding, cb) {
    this.push(+chunk + random100() + '');
    cb();
  },
  highWaterMark: 2
});

const output = new Writable({
  write(chunk, encoding, callback) {
    setTimeout(() => {
      console.log(chunk + '');
      callback();
    }, 500);
  },
  highWaterMark: 2
});

random.pipe(randomize).pipe(output);