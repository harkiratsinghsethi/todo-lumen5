import {filterTodos} from '../ToDoHelper'
import {expect} from 'chai';

const selectedCategory = 'Home'
const mockData = [{
    "ID": "5258052303",
    "TITLE": "write report",
    "STATE": "TODO",
    "DUE_DATE": "2021-05-05T07:00:00.000Z",
    "CATEGORY": "Work"
}, {
    "ID": "3892411139",
    "TITLE": "Laundry",
    "STATE": "TODO",
    "DUE_DATE": "2021-05-05T07:00:00.000Z",
    "CATEGORY": "Home"
}]
describe(`filterTodos function testing`, () => {
    // test your implementation of filterTodos
    it('should return write report todo', () => {
        const result = filterTodos(mockData, selectedCategory);
        expect(result[0].TITLE).to.be.eql('write report');
    });
});
