import { Select, SelectItem } from '@nextui-org/react';
import PropTypes from 'prop-types'
function MovieSortSelect({ selectedSort, sortData, setSelectedSort }) {
  return (
    <Select
      label='Sort by'
      className='max-w-[170px]'
      selectedKeys={[selectedSort]}
      onChange={(e) =>
        setSelectedSort(e.target.value)
      }
    >
      {sortData.map((data) => (
        <SelectItem key={data.value} value={data.value}>
          {data.label}
        </SelectItem>
      ))}
    </Select>
  )
}

MovieSortSelect.propTypes = {
  selectedSort: PropTypes.string,
  sortData: PropTypes.arrayOf(PropTypes.object),
  setSelectedSort: PropTypes.func,
}
export default MovieSortSelect