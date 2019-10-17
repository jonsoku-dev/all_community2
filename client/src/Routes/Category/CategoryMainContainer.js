import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCategories } from '../../Store/Actions/category';

const CategoryMainContainer = ({ category: { categories, loading }, getCategories }) => {
  useEffect(() => {
    getCategories();
  }, []);

  const renderCategories = () => {
    return categories.map(c => (
      <div key={c._id}>
        <div>{c.name}1234</div>
      </div>
    ));
  };

  return <div>{renderCategories()}</div>;
};

CategoryMainContainer.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  category: state.category,
});

export default connect(
  mapStateToProps,
  { getCategories },
)(CategoryMainContainer);
