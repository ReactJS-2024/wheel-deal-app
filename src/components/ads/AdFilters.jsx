import { useContext, useEffect, useState } from "react"
import AdContext from "../../context/adContext/AdContext";
import ActionTypes from "../../context/adContext/adActionTypes";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { Timestamp } from "firebase/firestore";


function AdFilters({isSoldFilterVisible}) {
    const [selectedFilter, setSelectedFilter] = useState({});
    const {dispatch} = useContext(AdContext);

    useEffect(() => {
        if (selectedFilter) {
            dispatch({
                type: ActionTypes.SET_ADS_FILTER,
                payload: selectedFilter
            });
        }
    }, [selectedFilter]);

    const selectedFilterHandler = (filterType, filterValue) => {

        if (filterType === 'resetFilter') {
            dispatch({
                type: ActionTypes.SET_ADS_FILTER,
                payload: null
            });
        } else {
            let filterConfig;
            if (filterType === 'publishedAt') {
                const daysAgo = new Date();
                daysAgo.setDate(daysAgo.getDate() - filterValue);
                const daysAgoTimestamp = Timestamp.fromDate(daysAgo);
                filterValue = daysAgoTimestamp;
            } 

            filterConfig = {
                [filterType]: filterValue
            }
            setSelectedFilter(filterConfig);
        }
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Filters
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown>
                    <DropdownButton
                        as={ButtonGroup}
                        id={`dropdown-button-drop-end`}
                        drop='end'
                        variant="light"
                        title='Vehicle type'>
                            <Dropdown.Item onClick={() => selectedFilterHandler('type', 'car')}>Cars</Dropdown.Item>
                            <Dropdown.Item onClick={() => selectedFilterHandler('type', 'motorcycle')}>Motorcycles</Dropdown.Item>
                            <Dropdown.Item onClick={() => selectedFilterHandler('type', 'bike')}>Bikes</Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
                {
                    isSoldFilterVisible &&
                        <Dropdown>
                            <DropdownButton
                                as={ButtonGroup}
                                id={`dropdown-button-drop-end`}
                                drop='end'
                                variant="light"
                                title='Sold status'>
                                    <Dropdown.Item onClick={() => selectedFilterHandler('isSold', true)}>Sold</Dropdown.Item>
                                    <Dropdown.Item onClick={() => selectedFilterHandler('isSold', false)}>Available</Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                }
                <DropdownButton
                        as={ButtonGroup}
                        id={`dropdown-button-drop-end`}
                        drop='end'
                        variant="light"
                        title='Published date'>
                            <Dropdown.Item as={Button} variant='light' onClick={() => selectedFilterHandler('publishedAt', 1)}>
                                Yesterday
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light' onClick={() => selectedFilterHandler('publishedAt', 7)}>
                                Last Week
                            </Dropdown.Item>
                            <Dropdown.Item as={Button} variant='light' onClick={() => selectedFilterHandler('publishedAt', 30)}>
                                Last Month
                            </Dropdown.Item>
                </DropdownButton>
                <Dropdown.Divider />
                <Dropdown.Item onClick={() => selectedFilterHandler('resetFilter')}>All Vehicles</Dropdown.Item>
            </Dropdown.Menu>

        </Dropdown>
    );
}
export default AdFilters