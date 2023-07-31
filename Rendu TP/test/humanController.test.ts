import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, {SinonSpy, SinonStub, SinonStubbedInstance} from 'sinon';
import { HumanController } from '../src/controllers/human.controller';
import * as humanServices  from '../src/services/human.service';

// Define a custom type for the mocked response
type MockedResponse = Response & { [K in keyof Response]: SinonStub };

// Mock the Response object
function createMockedResponse(): MockedResponse {
  const response: Partial<Response> = {
    send: sinon.stub(),
    status: sinon.stub().returnsThis(),
  };
  return response as MockedResponse;
}

describe('humanController', () => {
  let req: Request;
  let res: MockedResponse;
  let humanServicesStub: SinonStubbedInstance<humanServices.humanService>;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    } as Request;
    res = createMockedResponse();

    // Create a stub for the humanServices object
    humanServicesStub = sinon.createStubInstance<humanServices.humanService>(humanServices.humanService);

    // Replace the original humanServices object with the stub
    sinon.stub(humanServices, 'humanServices').value(humanServicesStub);
  });

  afterEach(() => {
    sinon.restore(); // Restore the original humanServices object after each test
  });

  describe('addHuman', () => {
    it('should create a new human', async () => {
      // Add test data to the request body
      req.body = {
        name: 'John',
        age: 30,
        city: 'New York',
        isWorking: true,
      };

      // Stub the createHuman method in humanServices to return a resolved promise with the test data
      humanServicesStub.createHuman.resolves(req.body);

      // Set the implementation of the status and send methods in the stubbed response
      res.status.returns(res);
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.addHuman(req, res);

      // Assert the response
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.send.calledWith(req.body)).to.be.true;
    });

    it('should return an error if validation fails', async () => {
      // Add invalid test data to the request body (name is too long)
      req.body = {
        name: 'TooLongName',
        age: 30,
        city: 'New York',
        isWorking: true,
      };

      // Stub the createHuman method in humanServices to throw an error (mocking validation failure)
      humanServicesStub.createHuman.throws(new Error('Validation failed'));

      // Set the implementation of the status and send methods in the stubbed response
      res.status.returns(res);
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.addHuman(req, res);

      // Assert the response contains an error message
      expect(res.status.calledWith(200)).to.be.true; // Status should be 200 since there's an error
      expect(res.send.calledWith('Validation failed')).to.be.true;
    });
  });

  describe('getHumans', () => {
    it('should return an array of humans', async () => {
      // Stub the getHumans method in humanServices to return a resolved promise with test data
      const testData = [
        { name: 'John', age: 30, city: 'New York', isWorking: true },
        { name: 'Alice', age: 25, city: 'Los Angeles', isWorking: false },
      ];
      humanServicesStub.getHumans.resolves(req.body);

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.getHumans(req, res);

      // Assert the response
      expect(res.send.calledWith(testData)).to.be.true;
    });
  });

  describe('getOneHuman', () => {
    it('should return a single human by ID', async () => {
      const testHuman = { name: 'John', age: 30, city: 'New York', isWorking: true };

      // Provide the ID of the human you want to retrieve
      req.params.id = 'your_human_id_here';

      // Stub the getHuman method in humanServices to return a resolved promise with the test data
      humanServicesStub.getHuman.withArgs('your_human_id_here').resolves(req.body);

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.getOneHuman(req, res);

      // Assert the response
      expect(res.send.calledWith(testHuman)).to.be.true;
    });

    it('should return an error if human not found', async () => {
      // Provide a non-existing ID
      req.params.id = 'non_existing_id';

      // Stub the getHuman method in humanServices to return a resolved promise with null (not found)
      humanServicesStub.getHuman.withArgs('non_existing_id').resolves('human not available');

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.getOneHuman(req, res);

      // Assert the response contains an error message
      expect(res.send.calledWith('human not available')).to.be.true;
    });
  });

  describe('updateHuman', () => {
    it('should update an existing human', async () => {
      const updatedData = { name: 'Updated Name', age: 35, city: 'San Francisco', isWorking: false };

      // Provide the ID of the human you want to update
      req.params.id = 'your_human_id_here';

      // Add test data to the request body
      req.body = updatedData;

      // Stub the updateHuman method in humanServices to return a resolved promise with the updated test data
      humanServicesStub.updateHuman.withArgs('your_human_id_here', updatedData).resolves(req.body);

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.updateHuman(req, res);

      // Assert the response
      expect(res.send.calledWith(updatedData)).to.be.true;
    });

    it('should return an error if human not found', async () => {
      // Provide a non-existing ID
      req.params.id = 'non_existing_id';

      // Add test data to the request body
      req.body = { name: 'Updated Name', age: 35, city: 'San Francisco', isWorking: false };

      // Stub the updateHuman method in humanServices to return a resolved promise with null (not found)
      humanServicesStub.updateHuman.withArgs('non_existing_id', req.body).resolves('human not available');

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.updateHuman(req, res);

      // Assert the response contains an error message
      expect(res.send.calledWith('human not available')).to.be.true;
    });
  });

  describe('deleteHuman', () => {
    it('should delete an existing human', async () => {
      // Provide the ID of the human you want to delete
      req.params.id = 'your_human_id_here';

      // Stub the deleteHuman method in humanServices to return a resolved promise
      humanServicesStub.deleteHuman.withArgs('your_human_id_here').resolves();

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.deleteHuman(req, res);

      // Assert the response
      expect(res.send.calledWith('human deleted')).to.be.true;
    });

    it('should return an error if human not found', async () => {
      // Provide a non-existing ID
      req.params.id = 'non_existing_id';

      // Stub the deleteHuman method in humanServices to return a resolved promise with null (not found)
      humanServicesStub.deleteHuman.withArgs('non_existing_id').resolves('human not available');

      // Set the implementation of the send method in the stubbed response
      res.send.returns(res);

      // Call the controller method with the stubbed request and response
      await HumanController.deleteHuman(req, res);

      // Assert the response contains an error message
      expect(res.send.calledWith('human not available')).to.be.true;
    });
  });
});