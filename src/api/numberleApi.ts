import express from 'express';
import bodyParser from 'body-parser';
import Collation from './Collation';
import Numberle from './Numberle';
import { apiCheckDigit } from '../modules/numberleModule';
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use((request, response, next): void => {
  if (
    apiCheckDigit(Number(request.body.seed)) !== Number(request.body.checkDigit)
  )
    return;

  response.set({
    'Access-Control-Allow-Origin': 'https://ambmcmdmem.github.io',
  });
  next();
});

server.post('/collation', (request, response): void => {
  response.send(
    new Collation().statusOfProposedSolution(
      request.body.proposedSolution,
      new Numberle(request.body.seed).getAnswer()
    )
  );
});

server.post('/getAnswer', (request, response): void => {
  response.send(new Numberle(request.body.seed).getAnswer());
});

server.listen(process.env.PORT || 5000);
