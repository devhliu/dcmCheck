//We excluded the tests for '**/studies/**' because the bulk/all of our other study/viewer tests use this route

describe('Visual Regression - DCMCloud Routes', function() {
  beforeEach(function() {
    cy.openStudyList();
  });

  /*
  // TODO -> Bring back when testJSON is hosted again.
  it('checks TEST json url study route', function() {
    cy.visit(
      '/viewer?url=https://dcmcloud-viewer.s3.eu-central-1.amazonaws.com/JSON/testJSON.json'
    );

    cy.server();
    cy.route('GET', '*TESTStudy; /**').as('getTESTStudy');

    cy.wait('@getTESTStudy.all');
    cy.get('@getTESTStudy').should($route => {
      expect($route.status).to.be.eq(200);
    });

    cy.percyCanvasSnapshot('TEST json study route');
  });
  */
});
