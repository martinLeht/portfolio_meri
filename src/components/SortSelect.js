import { MDBIcon } from "mdbreact";

const SortSelect = () => {
    return (
        <div>
            <label htmlFor="sortOptions">
                Lajittele
                <MDBIcon className="ml-2" icon="sort-alpha-down" />
            </label>
            <select className="browser-default custom-select" id="sortOptions">
                <option disabled value="1">Uusin ensimmäisenä</option>
                <option value="1">Uusin ensimmäisenä</option>
                <option value="2">Vanhin ensimmäisenä</option>
                <option value="3">Otsikon mukaan (A-Z)</option>
                <option value="4">Otsikon mukaan (Z-A) </option>
            </select>
        </div>
    );
}

export default SortSelect;