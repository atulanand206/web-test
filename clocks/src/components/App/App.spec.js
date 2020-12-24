import App from './App';
import {shallow} from "enzyme";
import Container from "../Container/Container";


describe('App', () => {
    let container;
    beforeEach(() => (container = shallow(<App/>)));

    it("should render a div", () => {
        expect(container.find('div').length).toEqual(1);
    });

    it("should render the Timer component", () => {
        expect(container.containsMatchingElement(<Container/>)).toEqual(true);
    })
});