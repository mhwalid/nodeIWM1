// test/test-humanController.ts
import { expect } from 'chai';
import { Request, Response } from 'express';
import sinon, { SinonStub } from 'sinon';
import { HumanController } from '../src/controllers/human.controller';
import {humanServices} from '../src/services/human.service';
import { HumansSchemaValidate } from '../src/models/human';

describe('humanController', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let humanServiceStub: SinonStub<any[], any>;

  beforeEach(() => {
    req = {
      body: {
        name: 'John',
        age: 30,
        city: 'New York',
        isWorking: true,
      },
      params: {
        id: '1',
      },
    };

    res = {
      status: sinon.stub().returnsThis(),
      send: sinon.stub(),
    };

    humanServiceStub = sinon.stub(humanServices);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('addHuman', () => {
    it('should add a human', async () => {
      const validatedData = { name: 'John', age: 30, city: 'New York', isWorking: true };
      const createdHuman = { id: '1', ...validatedData };

      HumansSchemaValidate.validate = sinon.stub().returns({ value: validatedData });

      humanServiceStub.createHuman.resolves(createdHuman);

      await HumanController.addHuman(req as Request, res as Response);

      expect(HumansSchemaValidate.validate).to.be.calledOnceWith(req.body);
      expect(humanServiceStub.createHuman).to.be.calledOnceWith(validatedData);
      expect(res.status).to.be.calledOnceWith(201);
      expect(res.send).to.be.calledOnceWith(createdHuman);
    });

    it('should handle validation error', async () => {
      const validationError = new Error('Invalid data');
      HumansSchemaValidate.validate = sinon.stub().returns({ error: validationError });

      await HumanController.addHuman(req as Request, res as Response);

      expect(HumansSchemaValidate.validate).to.be.calledOnceWith(req.body);
      expect(humanServiceStub.createHuman).to.not.be.called;
      expect(res.send).to.be.calledOnceWith(validationError.message);
    });
  });

  describe('getHumans', () => {
    it('should get all humans', async () => {
      const allHumans = [{ id: '1', name: 'John', age: 30, city: 'New York', isWorking: true }];

      humanServiceStub.getHumans.resolves(allHumans);

      await HumanController.getHumans(req as Request, res as Response);

      expect(humanServiceStub.getHumans).to.be.calledOnce;
      expect(res.send).to.be.calledOnceWith(allHumans);
    });
  });


  describe('getOneHuman', () => {
    it('should get a single human', async () => {
      const id = '1';
      const singleHuman = { id, name: 'John', age: 30, city: 'New York', isWorking: true };

      humanServiceStub.getHuman.resolves(singleHuman);

      await HumanController.getOneHuman(req as Request, res as Response);

      expect(humanServiceStub.getHuman).to.be.calledOnceWith(id);
      expect(res.send).to.be.calledOnceWith(singleHuman);
    });
  });

  describe('updateHuman', () => {
    it('should update a human', async () => {
      const id = '1';
      const updatedHuman = { id, name: 'Updated John', age: 35, city: 'New York', isWorking: false };

      humanServiceStub.updateHuman.resolves(updatedHuman);

      await HumanController.updateHuman(req as Request, res as Response);

      expect(humanServiceStub.updateHuman).to.be.calledOnceWith(id, req.body);
      expect(res.send).to.be.calledOnceWith(updatedHuman);
    });
  });

  describe('deleteHuman', () => {
    it('should delete a human', async () => {
      const id = '1';

      await HumanController.deleteHuman(req as Request, res as Response);

      expect(humanServiceStub.deleteHuman).to.be.calledOnceWith(id);
      expect(res.send).to.be.calledOnceWith('human deleted');
    });
  });
});
