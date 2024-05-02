import { useContext, useEffect, useRef } from "react";
import StatsContext from "../context/statsContext/StatsContext";
import { subscribeToStatsForUser } from "../context/statsContext/statsActions";
import ActionTypes from "../context/statsContext/statsActionTypes";
import CustomSpinner from "../components/shared/Spinner";
import NoDataMsg from "../components/shared/NoDataMsg";
import { Button, Card, Row } from "react-bootstrap";
import { euroCurrencyValueFormatter, euroCurrencyValueFormatterToNumber } from "../utils/priceUtils";
import { convertFBTimestampToDate } from "../utils/dateUtils";
import generatePDF from "react-to-pdf";

function Stats() {
   
    const {statsData, dispatch} = useContext(StatsContext);
    const targetRef = useRef();

    useEffect(() => {
        if (!statsData?.stats) {
            const unsubscribe = subscribeToStatsForUser((fetchedSoldAds, earnings) => {
                dispatch({
                    type: ActionTypes.SET_USER_STATS,
                    payload: {
                        stats: fetchedSoldAds,
                        earnings
                    }
                });
            });
            return () => unsubscribe();
        }
    }, [dispatch, statsData?.stats]);

    if (!statsData?.stats) {
        return <CustomSpinner />;
    } 

    if (statsData?.stats.length === 0) {
        return <NoDataMsg messageText={'No available stats for this user'} />;
    }

    return (
        <>
            <div className="stats-wrapper" ref={targetRef}>
                <h1 className="text-center mb-3">Sellings</h1>
                {
                    statsData.stats.map(item => (
                        <Row key={item.ad.id}>
                            <Card className="flex-row">
                                <Card.Header>
                                    <h3 className="text-success">{item.ad.title}</h3>
                                </Card.Header>
                                <Card.Body className="text-center">
                                    <h3>Sold for <strong>{euroCurrencyValueFormatterToNumber(item.ad.price)}</strong></h3>
                                </Card.Body>
                                <Card.Footer>
                                    <h3>Sold at {convertFBTimestampToDate(item.soldTimestamp)}</h3>
                                </Card.Footer>
                            </Card>
                        </Row>
                    ))
                }
                <div className="action-wrapper text-center mt-4">
                    <h1 className="text-center text-success mt-4">Earnings : {euroCurrencyValueFormatter(statsData.earnings)}</h1>
                </div>
            </div>
            <div className="action-wrapper text-center mt-4">
                {
                    statsData.stats &&
                        <Button 
                            className="btn btn-success"
                            onClick={() => generatePDF(targetRef, {filename: 'report.pdf'})}>
                                Export to PDF
                        </Button>
                }
            </div>
        </>
    );
}

export default Stats;
