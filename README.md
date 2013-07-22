jdUpload
========

This is an angular js upload directive for two step form submission.

Example:
-------

    <input
        jd-upload

        jd-state="uploading"
        jd-url="api.php?method=upload" OR jd-url-method="getUrl()"
        jd-auto-upload="true" 
        jd-json="true"

        on-finished="finished(content, didUpload)"
        on-error="log('error')"
        on-success="success(content)"

        type="file"
        name="attachment"

    />

As soon as the jd-state variable (In this case 'uploading') is set to true, the upload begins.
When the iframe is ready the different callbacks (success or error, and finished) are called.

Try index.html on your php enabled webserver to see the full example.

