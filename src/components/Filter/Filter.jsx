import React, { Component } from "react";
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';

class Filter extends Component {
    render() {
        const idFilter = nanoid();
        const { filter, onInputChangeFilter } = this.props;

        return (
            <div className={css.filter}>
                <label className={css.filterLabel} htmlFor={idFilter}>Find contacts by name</label>
                <input
                    className={css.filterInput}
                    id={idFilter}
                    type="text"
                    name="find"
                    value={filter}
                    onChange={onInputChangeFilter}
                    title="Find contacts by name"
                />
            </div>
        );
    }
};

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onInputChangeFilter: PropTypes.func.isRequired,
};

export default Filter