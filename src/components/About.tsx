import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 18px;
  h2 {
    font-size: inherit;
    font-weight: bolder;
    margin-top: 1em;
  }
  h5 {
    font-size: inherit;
    font-weight: bolder;
    margin-top: 1em;
    opacity: 0.5;
  }

  .two-col {
    display: grid;
    grid-template-columns: 4fr 7fr;
    grid-column-gap: 2em;
  }
  max-width: 1200px;
  margin: auto;
`;

export const About = () => (
  <Wrapper>
    <h1>About</h1>
    <p>
      This report presents the results of a detailed survey of impact fees that
      individual jurisdictions across the country are charging. Unlike in-kind
      developer exactions,impact fees are expressed in dollars and have
      published fee schedules, making it easy to compare fees charged by
      different jurisdictions. The results of the survey describe where impact
      fees are most common, how much jurisdictions in various states are
      charging, and the types of facilities for which fees are being charged.
    </p>
    <main className="two-col">
      <div>
        <h2>What Qualifies as an Impact Fee?</h2>
        <p>
          The multitude of names used to refer to impact fees is one obstacle to
          developing an accurate survey of such fees. Common terms used to refer
          to impact fees include “capacity fees,” “facility fees,” “system
          development charges” and “capital recovery fees.” Their common
          characteristics are that (1) they are charged only to new development,
          (2) they are standardized fees as opposed to ad hoc, negotiated
          payments and (3) they are designed and used to fund capital
          improvements needed to serve growth.
        </p>
        <h5>Utility Connection Fees</h5>
        <p>
          Water and wastewater connection fees that are used to fund
          growth-related capital improvements should be classified as impact
          fees. However, connection fees often mix impact fee components with
          service fees that cover other types of costs, such as the purchase of
          a water meter, the inspection of the connection, or the administrative
          cost of establishing a new customer account. In addition, because
          water and wastewater fees preceded other kinds of impact fees, they
          are often authorized under separate statutory authority and are often
          more difficult to find. This presents the researcher with a problem.
          Counting only clearly-labeled water and wastewater impact fees is
          likely to under-represent them, but seldom are there sufficient
          resources to interview local officials to determine what portion of a
          connection fee is actually an impact fee. For these reasons, it is
          often useful to look at “non-utility” impact fees separately from
          total impact fees.
        </p>
        <h5>Fees-in-Lieu. </h5>
        <p>
          Fees charged in lieu of and dedication for parks and schools are
          conceptually very similar to impact fees, and should also be counted
          in an impact fee survey. Essentially, they function much like an
          impact fee for the land component of the facility. Indeed, some
          communities use an impact fee for the construction cost component, and
          combine that with a land dedication/fee-in-lieu requirement for the
          land component. In California, park fees in-lieu of land dedication
          are known as “Quimby fees,” after the name of the 1966 state act
          authorizing such fees. Because they are not labeled as impact fees,
          land dedication fees-in-lieu are often overlooked in impact fee
          surveys.
        </p>
        <h5>Development Taxes</h5>
        <p>
          Another class of fee that is functionally very similar to an impact
          fee is the development tax, which is sometimes also referred to as a
          development excise tax, privilege tax or facilities tax. This is a tax
          that only applies to new development, of ten on a per square foot
          basis, and is earmarked for capital improvements. The two can be
          difficult to distinguish. For example, Boulder, Colorado hired
          consultants to conduct a nexus study and adopted an ordinance that had
          all of the trappings of an impact fee ordinance, including earmarking
          of funds for specific types of capital facilities and providing credit
          against the charges for developer-constructed improvements, but
          instead of adopting them as impact fees the City adopted them as
          development taxes. This survey includes development taxes.
        </p>
      </div>
      <div>
        <h2>Some Caveats</h2>
        <p>
          The results of impact fee surveys can be misinterpreted. This can be
          avoided if the reader keeps the following caveats in mind.
        </p>
        <p>
          <h5>Not Exhaustive Samples</h5>
          Like most impact fee surveys, this survey only includes communities
          that charge some impact fees, and excludes those that don ot. Thus, an
          “average impact fee” must be understood as an average fee for those
          communities that charge impact fees, not as an average for all
          communities. Although in California state limits on local taxing
          authority and relatively liberal impact fee enabling legislation have
          combined to make impact fees virtually universal, in most other parts
          of the country communities that have impact fees (other than
          ubiquitous water and wastewater connection fees) tend to be in the
          minority.
        </p>
        <h5>Not Random Samples</h5>
        <p>
          Impact fee surveys tend to be opportunistic, and this one is no
          exception. For the most part, the inclusion of a community is
          determined by how readily available the information is. Communities
          that post their fee schedules on their website are more likely to be
          included in a survey than communities that do not. Consultants who
          compile surveys are more likely to include communities that have been
          clients or that are in the same region with former clients, and this
          one is no exception. For example, our firm compiled extensive surveys
          of impact fees in Arizona and Florida for client communities in those
          states. For these reasons, the fact that a state is not well
          represented in a national survey does not necessarily mean that the
          state does not have many impact fees.
        </p>
        <h5>Average Total Fee, not Sum of Average Fees</h5>
        <p>
          In this survey, average fees are presented for a variety of capital
          facilities. These averages exclude communities that are represented in
          the survey but do not charge impact fees for the particular facility
          type. One could sum these average fees by facility type, but this “sum
          of the average fees” does not represent the average fee for
          communities that charge impact fees. A more meaningful statistic, and
          the one reported here, is the “average of the total impact fees”
          charged by all communities represented in the survey.
        </p>
        <p>
          The fact that a community does not charge a particular impact fee does
          not mean that developers make no contributions to that type of capital
          facility. This is particularly true in the case of roads, because many
          communities without road impact fees require developers to dedicate
          right-of-way and make substantial improvements to abutting roadways as
          conditions of development approval. In communities with road impact
          fees, developers who are required to make in-kind contributions may
          receive credit against their impact fees for the value of those
          contributions. Thus,developers may actually contribute more on average
          to the cost of major road improvements in communities without road
          impact fees than in communities with modest road impact fees.
        </p>
        <h5>Exactions</h5>
        <p>
          Some communities have standard developer exactions that are not
          expressed in dollars. Typical examples are road right-of-way and park
          and school land dedication requirements. We included an estimated cost
          per development unit to represent the value of such required
          contributions whenever possible.
        </p>
        <p>
          In addition to broadly-applicable developer exaction requirements,
          some development may also be required or induced to offer other
          contributions toward public capital improvements, such as over-sizing
          water and wastewater lines or making land dedications for roads,
          parks, or fire stations that are not required for all developments. It
          was not possible to assign a standard dollar value per development
          unit for such ad hoc or negotiated exactions.
        </p>
        <h5>Unusual Assessment Bases</h5>
        <p>
          Most impact fee schedules assess impact fees per residential dwelling
          unit or per 1,000 square feet of nonresidential development, and that
          is reflected in the structure of the survey. However, some communities
          use a different basis for at least some fees. Residential fees may be
          assessed based on unit size or number of bedrooms, rather than by a
          flat rate per dwelling unit. Utility fees are generally assessed by
          meter size for multi-family and nonresidential uses. Drainage fees are
          often assessed per square foot of impervious cover. To address this
          issue, we assumed typical residential unit size, number of bedrooms,
          and building densities, and these assumptions are identified in the
          land use headings of the survey sheets that follow.
        </p>
        <p>
          For some communities, published water and wastewater fees were only
          available for a single-family home. In these cases, we took advantage
          of the fact that virtually all water and wastewater fees are based on
          the capacity of the water meter, and there is a relatively standard
          relationship between the smallest meter size that is almost always the
          one used by most single-family homes and the larger meters typically
          used for multi-family and nonresidential development. We assumed that
          a 2” meter has 7 times the capacity of the single-family meter, Survey
          Data and a 3” meter has 16 times as much capacity.
        </p>
      </div>
    </main>
    <p>
      The survey was completed by Clancy Mullen, principal of DuncanAssociates,
      on August 18, 2019, with assistance from Matt Dixon, graduate research
      assistant at the University of Arizona, and David Hymel and Stuart
      Wallace, J.D. candidates at Georgia State University College of Law.
    </p>
  </Wrapper>
);
