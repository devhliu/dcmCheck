# Connecting to Image Archives

We support DIMSE and DICOMWeb. Which one to use is up to you and depends on your
PACS system. DICOMWeb requires no setup on the PACS-side whatsoever, whereas
DIMSE may require you to add the 'DCMCloudDCM' aeTitle to the known DICOM
Modalities of your Archive. This is the case for Orthanc, for example (See
https://github.com/DCMCloud/Viewers/wiki/Orthanc-with-DIMSE).
