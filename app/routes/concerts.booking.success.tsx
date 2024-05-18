import ConcertsLayout from "...";
import ConcertsBookingSuccess from "...";
import ConcertsIndex from "...";
import ConcertsTrending from "...";
import ConcertsBooking from "...";
import Routes from "...";
import Route from "...";

<Routes>
	<Route path="/concerts" element={<ConcertsLayout />}>
		<Route index element={<ConcertsIndex />} />
		<Route path="trending" element={<ConcertsTrending />} />
		<Route path="booking" element={<ConcertsBooking />}>
			<Route path="success" element={<ConcertsBookingSuccess />} />
		</Route>
	</Route>
</Routes>;
