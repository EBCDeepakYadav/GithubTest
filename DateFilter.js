
$('#datepickerfrom').datepicker({
    uiLibrary: 'bootstrap5'
});
$('#datepickerto').datepicker({
    uiLibrary: 'bootstrap5'
});

function formatDateTime(data) {
    if (!data) return '';
    const date = new Date(data);

    const formatted = date.toLocaleString({
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });

    return formatted.replace('am', 'AM').replace('pm', 'PM');
}
var isNarrow = window.innerWidth < 1310;
const tableCouponRequest = new DataTable('#couponRequestList', {
    //scrollY: 600,
    scrollX: isNarrow,
    scrollCollapse: true,
    paging: true, 
    info: false,
    searching: false,
    data: couponRequestList,
    fixedHeader: true,
    autoWidth: false,
    ordering: true,      // let user sort
    order: [],
    columns: [
        {
            data: null,
            visible: false,   
            searchable: false 
        },
        {
            data: 'requestId'
        },
        { data: 'requestedBy' },
        {
            data: 'requestedDate',
            render: function (data) {
                return formatDateTime(data);
            }
        },
        { data: 'status' },
        { data: 'approvedBy' },
        {
            data: 'approvedDate',
            render: function (data) {
                return formatDateTime(data);
            }
        },
        {
            data: null,
            orderable: false,
            searchable: false,
            render: function (data, type, row) {
                let status = row.status;

                // Initialize button classes and css
                let editClass = '';
                let processClass = '';
                let downloadClass = '';
                const disabledStyle = 'pointer-events:none;opacity:0.5;cursor:not-allowed;';

                // Assign disabled-link based on status
                if (status === 'Pending') {
                    editClass = '';
                    processClass = 'disabled-link';
                    downloadClass = 'disabled-link';
                } else if (status === 'Processed') {
                    editClass = 'disabled-link';
                    processClass = 'disabled-link';
                    downloadClass = '';
                } else if (status === 'Approved') {
                    editClass = 'disabled-link';
                    processClass = '';
                    downloadClass = 'disabled-link';
                }
                else if (status === 'Declined') {
                    editClass = 'disabled-link';
                    processClass = 'disabled-link';
                    downloadClass = 'disabled-link';
                }

                let tokenDownloadClass = 'disabled-link';
                let printDownloadClass = 'disabled-link';
                let activatedDownloadClass = 'disabled-link';

                if (status === 'Processed') {
                    tokenDownloadClass = '';
                    printDownloadClass = '';
                    activatedDownloadClass = '';
                }


                const requestId = row.requestId;
               // console.log(status)
                const downloadLinks = `
                <div class="d-inline-block ms-2">
                         <a href="/Coupon/CreateCouponRequest/${row.requestId}" style="${editClass ? disabledStyle:''}" class="${editClass} d-inline-block btn f-13 pyx_5-10 text-nowrap hint--left me-2" aria-label="Click here to Edit/Approve/Decline Coupon Request"><img src="/images/approve.svg" alt="Approve" width="20" height="20" /></a>
                         <a href = "/Coupon/CouponTokenGeneration/${row.requestId}" style="${processClass ? disabledStyle : ''}" class="d-inline-block btn f-13 pyx_5-10 text-nowrap hint--left me-2 ${processClass}" aria-label="Click here to Process Package" >
                             <img src="/images/process2.png" height="20" alt="Process" />
                          </a >
                        <a href="javascript:void(0);" onclick="downloadFile('${requestId}', 'tokens')" style="${tokenDownloadClass ? disabledStyle : ''}"  class="${tokenDownloadClass} d-inline-block btn f-13 pyx_5-10 text-nowrap hint--left" aria-label="Download Token File"><img src="/images/download-token.png" alt="Download" width="19" height="20" /></a>
		                <a href="javascript:void(0);" onclick="downloadFile('${requestId}', 'print')" style="${printDownloadClass ? disabledStyle : ''}" class="${printDownloadClass} d-inline-block btn f-13 pyx_5-10 text-nowrap hint--left" aria-label="Download Send for Printing"><img src="/images/download-printing.png" alt="Download" width="19" height="20" /></a>
		                <a href="javascript:void(0);" onclick="downloadFile('${requestId}', 'activated')" style="${activatedDownloadClass ? disabledStyle : ''}" class="${activatedDownloadClass} d-inline-block btn f-13 pyx_5-10 text-nowrap hint--left" aria-label="Download Activate Serial Number"><img src="/images/download-serial.png" alt="Download" width="19" height="20" /></a>
		                <a href="javascript:void(0);" onclick="downloadChallan(${row.challanNo},${requestId})" style="${downloadClass ? disabledStyle : ''}" class="d-inline-block btn f-13 pyx_5-10 text-nowrap hint--left ${downloadClass}" aria-label="Download Challan">
                          <img src="/images/download-challan.png" alt="Download" height="20" />
                        </a>
                </div>`;

                return `<td class="text-center">${downloadLinks}</td>`;





            }
        }
    ],

    columnDefs: [
        {
            searchable: false,
            orderable: false,
            order:[],
            targets: 0,
            width: '80px'
        },
        //{ width: '225px', targets: 2 },
        //{ width: '225px', targets: 3 },
        //{ searchable: false, orderable: false, width: '180px', targets: 4 },
        { width: '100px', targets: -1, className: "text-nowrap" },
        //{ searchable: false, orderable: false, width: '125px', targets: -1 }
    ],
});



var paging = $('.dt-paging');
paging.insertAfter('.tableWrapper');
var length = $('.dt-length');
length.appendTo('.pageLength');

var search = $('#couponRequestList_wrapper .dt-search');
search.appendTo('#searchCouponRequestList');
var length = $('#couponRequestList_wrapper .dt-length');
length.appendTo('#CouponRequestListLength .pageLength');
var paging = $('#couponRequestList_wrapper .dt-paging');
paging.insertAfter('.tableWrapper');
paging.appendTo('#CouponRequestListPaging');
var pagination = $(".pagination");
paging.addClass('mb-0');


tableCouponRequest.on('order.dt search.dt draw.dt', function () {
    let i = 1;
    tableCouponRequest
        .cells(null, 0, { search: 'applied', order: 'applied' })
        .every(function (cell) {
            this.data(i++);
        });
}).draw();

function handleEmptyState(visibleCount) {
    const pagination = $('#CouponRequestListPaging');
    const noRecordMsg = $('#noRecordsMessage');

    if (visibleCount === 0) {
        pagination.hide();
        noRecordMsg.show();
    } else {
        pagination.show();
        noRecordMsg.hide();
    }
}
$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        const fromDate = $('#datepickerfrom').val();
        const toDate = $('#datepickerto').val();

        if (!fromDate || !toDate) {
            return true; // no filter applied, show all rows
        }

        const startDate = normalizeDate(new Date(fromDate));
        const endDate = normalizeDate(new Date(toDate));

        const requestedDateStr = data[2]; // assuming Requested Date is in 3rd column
        const requestedDate = normalizeDate(new Date(requestedDateStr));

        return requestedDate >= startDate && requestedDate <= endDate;
    }
);


$('#btnShowRecord').click(function () {
    const fromDate = $('#datepickerfrom').val();
    const toDate = $('#datepickerto').val();

    if (!fromDate || !toDate) {
        infoNotification("Info!!", "Please select both From Date and To Date.", "");
        return;
    }

    if (fromDate && toDate) {
        const startDate = normalizeDate(new Date(fromDate));
        const endDate = normalizeDate(new Date(toDate));

        if (startDate > endDate) {
            infoNotification("Info!!", "From Date cannot be greater than To Date.", "");
            return;
        }
    }

    // Just redraw the table, DataTables will apply the filter defined above
    tableCouponRequest.draw();

    // Now check visible rows and toggle pagination/message
    let visibleCount = tableCouponRequest.rows({ filter: 'applied' }).count();
   // console.log("Visible Row Count:", visibleCount);
    handleEmptyState(visibleCount);
});

function normalizeDate(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/* Add icon on .nav-item if dropdown exists */
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
    const hasDropdowns = item.querySelector(".dropdown") !== null;
    if (hasDropdowns) {
        item.classList.add("icon");
    }
});

async function downloadChallan(challanId,requestId) {
    try {
        const response = await fetch(`/challan/download/${challanId}/${requestId}`);

        // Check if it's a JSON error response
        const contentType = response.headers.get("Content-Type");

        if (contentType && contentType.includes("application/json")) {
            const json = await response.json();
            if (!json.success) {
                infoNotification("Information", "Challan pdf not found.");
                return;
            }
        }

        // Otherwise, assume it's a PDF
        const blob = await response.blob();

        // Trigger download
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `Challan_${challanId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
    catch (err) { 
        alert("An error occurred while downloading the challan.");
        RedirectIfError(err)
    }
}
function downloadFile(requestId, type) {
    fetch(`/Coupon/DownloadCouponFile?requestId=${requestId}&type=${type}`)
        .then(response => {
            if (!response.ok) throw new Error("There might be some network problem !");

            // Extract filename from header
            const disposition = response.headers.get('Content-Disposition');
            let filename = `${type}_${requestId}.txt`;
            if (disposition && disposition.includes('filename=')) {
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match?.[1]) {
                    filename = match[1];
                }
            }

            return response.blob().then(blob => ({ blob, filename }));
        })
        .then(({ blob, filename }) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        })
        .catch(error => {
            RedirectIfError(error)
            alert("Failed to download file.");
        });
}
