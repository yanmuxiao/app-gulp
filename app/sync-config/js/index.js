

var atHtml = '<form class="OOHM-layer-form" action="#">' + 

    '<div class="OOHM-layer-list sync-label"><label class="label-title">活动名称：</label><div class="form-content"><input type="text" /></div></div>' +

    '<div class="OOHM-layer-list sync-time"><label class="label-title">周期：</label><div class="form-content"><input type="text" id="periodStart" /> <span class="zhiorto">至</span> <input type="text" id="periodEnd" /></div></div>' +

    '<div class="OOHM-layer-list sync-label"><label class="label-title">广告主：</label><div class="form-content"><input type="text" /></div></div>' +

    '<div class="OOHM-layer-list sync-label"><label class="label-title">品牌：</label><div class="form-content"><input type="text" /></div></div>' +

    '<div class="OOHM-layer-list sync-label"><label class="label-title">活动阶段：</label><div class="form-content">' + 

          '<div class="add-stage"><button class="btn btn-small btn-warning" id="addStage"><i class="icon-plus icon-white"></i> Create</button></div>' + 

          '<div class="at-table-wrap"><table class="table table-bordered at-stage-table"><thead><tr><th width="30%">阶段名称</th><th>时间范围</th></tr></thead><tbody><tr><td><input type="text" value="上刊"></td><td><input type="text" class="at-date-s" id="atDates00" value="2017-01-01"> - <input type="text" class="at-date-e" value="2017-1-31" id="atDates01" ></td></tr><tr><td><input type="text" value="上刊"></td><td><input type="text" class="at-date-s" id="atDates10" value="2017-01-01"> - <input type="text" class="at-date-e" value="2017-1-31" id="atDates11" ></td></tr><tr><td><input type="text" value="上刊"></td><td><input type="text" class="at-date-s" id="atDates20" value="2017-01-01"> - <input type="text" class="at-date-e" value="2017-1-31" id="atDates21" ></td></tr></tbody></table></div>' +

    '</div></div>' +

    '<div class="OOHM-layer-list sync-label"><label class="label-title"></label><div class="form-content"><button class="btn  btn-success" type="button">Save</button></div></div>' +

   '</form>';

   // 创建活动
   $('.create-at').click(function() {
      atCreateDetail('创建活动11')
   })

   // 活动详情
   $('.at-detail-btn').click(function() {
      atCreateDetail('活动详情')
   })




  function atCreateDetail(title) {
    var layerMask = layer.open({
        type: 1,
        title: '<div>' + title + '</div>',
        skin: 'adminLogin', //加上边框
        area: ['640px', 'auto'], //宽高
        // scrollbar: false,
        content: atHtml
      });
      function layerClose(){layer.close(layerMask);}


      // 日期
      var periodStartDate = {
         elem: '#periodStart',
         choose: function(datas){
          periodEndDate.min = datas //将结束日的初始值设定为开始日
         }
      };
      var periodEndDate = {
         elem: '#periodEnd',
         choose: function(datas){
            periodStartDate.max = datas; //结束日选好后，重置开始日的最大日期
         }
      }
      $('#periodStart').focus(function() {
        laydate(periodStartDate);
      })
      $('#periodEnd').focus(function() {
        laydate(periodEndDate);
      })


      // 活动阶段时间范围
      
      $('.at-stage-table tbody tr').each(function() {

          addNewDate($(this));


      })

      $('#addStage').click(function() {
          var atTbody = $('.at-stage-table');
          var trCurLenght = atTbody.find('tr').length;

          var apHtml = '<tr><td><input type="text" value="上刊"></td><td><input type="text" class="at-date-s" id="atDates' + trCurLenght + '0" placeholder="开始时间"> - <input type="text" class="at-date-e" placeholder="结束时间" id="atDates' + trCurLenght + '1" ></td></tr>';

          atTbody.append(apHtml);

          addNewDate(atTbody.find('tr').eq(trCurLenght));
      })

  }


   function addNewDate(objArg) {
      var atDateStart = objArg.find('.at-date-s').eq(0);
      var atDateStartID = objArg.find('.at-date-s').eq(0).prop('id');

      var atDateEnd = objArg.find('.at-date-e').eq(0);
      var atDateEndID = objArg.find('.at-date-e').eq(0).prop('id');


      var dateStartDate = {
         elem: '#' + atDateStartID,
         choose: function(datas){
          dateEndDate.min = datas //将结束日的初始值设定为开始日
         }
      };
      var dateEndDate = {
         elem: '#' + atDateEndID,
         choose: function(datas){
            dateStartDate.max = datas; //结束日选好后，重置开始日的最大日期
         }
      }
      atDateStart.focus(function() {
        laydate(dateStartDate);
      })
      atDateEnd.focus(function() {
        laydate(dateEndDate);
      })
   }
