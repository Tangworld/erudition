/**
 * Created by Administrator on 2016/6/2.
 */
//���󼶱�Ĳ������----------������ҳ��ˢ��ʱ����ִ��
;(function($){
    var FileOut=function(){
        var self=this;
        //��ȡ����DOM��ҪΧ���ַ�����ʹ��
        self.pre_btn='.file-out .pre-btn';
        self.next_btn='.file-out .next-btn';
        self.root='.file-body';
        self.root_element='.body-floor';
        self.currentPopwin;
        self.nextPopwin;

        self.currentIndex;
        self.allIndex;

        //���ݳ�
        self.fileData;
        self.fileRelations;

        console.log("���ò��");

        $(document).on("click",".body-floor .file-name span",function(event){         //�����ǰ�������������    ������û������return��
            var me=$(this);

            event.stopPropagation();
            //��ȡ��ǰҳ��ȫ���������
            self.allIndex=self.getAllIndex();
            console.log("��ǰҳ��ȫ������:"+self.allIndex);
            //����ҳ���е�Ԫ��index����
            self.setIndex();
            //��ȡ��ǰ��������λ��
            self.currentIndex=$(this).parents(self.root_element).attr("index");
            console.log("��ǰ���Ϊ��"+self.currentIndex+"��");
            //��ȡ����
            self.getData(self.currentIndex);
            //��Ⱦ����
            self.renderDOM();            //��Ϊ������˳�����Կ��������˼ɵ�ʹ�ã���������//��̬��Ⱦ�붯̬��Ⱦ��ʱ���������⣿
            self.carousel();          //���ֲ��¼������ǻ�û�����⻯,


            //���붯̬����
            //self.renderData($(this));        //����ǰ�������
        })

    };
    FileOut.prototype={
        //����index��ȡԪ��id
        getIdByIndex:function(index){
            var self=this;
            console.log("���͵�ǰ��id"+$(self.root_element).eq(index-1).find(".file-name").find("span").eq(0).attr("id"));
            return $(self.root_element).eq(index-1).find(".file-name").find("span").eq(0).attr("id");
        },
        //���ʱ�������---���ݵ�ǰ�±��ȡ
        getData:function(index){
            var self=this;
            console.log("��ʼ��ȡ����");
            //�����±��ȡid
            //var file_id = me.attr("id");
            var file_id=self.getIdByIndex(index);
            console.log("��ȡ��idΪ:"+file_id);
            var file;
            $.ajax({
                url:'/erudition/resources/file/'+file_id,                 //${rootPath}ʧЧ
                type:'get',
                async : false, //Ĭ��Ϊtrue �첽
                success:function(data){
                    self.fileData=data.file;
                    self.fileRelations=data.relationfiles;        //��ȡ�����ļ�
                    console.log("��ȡ�Ĺ����ļ�Ϊ:"+data.relationfiles);
                },error:function(){
                    alert("error"+file_id);
                    return "error";
                }
            });
        },
        //������Ⱦ����
        getAllIndex:function(){
            var self=this;
            return $(self.root).children(self.root_element).length;           //���ﶯ̬����Ԫ�ظ���
        },
        setIndex:function(){
            var self=this;
            var num=1;
            $(self.root).children(self.root_element).each(function(){
                $(this).attr("index",num++);
            })
        },
        renderDOM:function(me){
            var self=this;
            var file=self.fileData;
            var fileRelations=self.fileRelations;
            //ת��ʱ���
            var date = new Date(file.createTime);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
            var D = date.getDate() + ' ';
            var h = date.getHours() + ':';
            var m = date.getMinutes() + ':';
            var s = date.getSeconds();
            var createDate = Y+M+D+h+m+s;
            /*var obj = "<div class='content'><div class='file'><div class='file-thumbnails'>"
                + "<div class='file-name'> <img alt='' class='file-name' src='/erudition/assets/images/test.jpg'/></div><div class='file-class'>"
                + file.type+"</div></div><div class='file-size'><button class='download'>�鿴�ļ�("
                + file.size+")</button></div></div></div><div class='attribute'>"
                + "<div class='a-info'><div class='a-first'><div class='file-from'>�����ļ���:&nbsp;&nbsp;"
                + file.categoryName+"</div><div class='a-close'>��</div><div class='clearfix'></div>"
                + "</div><div class='file-name'>"+file.title+"</div><div class='a-third'>"
                + "<div class='file-uptime'><i class='fa fa-clock-o'></i>�ϴ�ʱ��:&nbsp;&nbsp;"+"createDate"
                + "</div><div class='file-people'><i class='fa fa-user'></i>�ϴ���:&nbsp;&nbsp;"+file.creater
                + "</div></div></div><div class='line'></div><div class='a-operate'><ul>"
                + "<li><a href='/erudition/admin/file/download/"+file.id+"'><i class='fa fa-download'></i>&nbsp;&nbsp;����</a></li>"
                + "<li><a href='#'><span id='"+file.id+"'><i class='fa fa-star'></i>&nbsp;&nbsp;���������Ŀ¼</a></li>"
                + "</ul></div><div class='line'></div><div class='a-related'><ul>"
                + "<li><a href='#'><i class='fa fa-link'></i>&nbsp;&nbsp;&nbsp;��������</a></li>";*/
            console.log("file.type="+file.type);
            console.log("file.size="+file.size);


            var strDom1=['<div class="file-out" style="display: none;" >',
                '        <div class="pre-btn pre-bg"></div>',
                '        <!--<div class="clearfix"></div>-->',
                '        <div class="file-body">',
                '            <div class="content">',
                '                <div class="file">',
                '                    <div class="file-thumbnails">',
                '                        <div class="file-name">SQLdb_ilearn_3</div>',
                '                        <div class="file-class">'+file.type+'</div>',
                '                    </div>',
                '                    <div class="file-size">',
                '                        <button class="download">�鿴�ļ�('+file.size+')</button>',
                '                    </div>',
                '                </div>',
                '            </div>',
                '            <!--<div class="clearfix"></div>-->',
                '            <div class="attribute">',
                '                <div class="a-info">',
                '                    <div class="a-first">',
                '                        <div class="file-from">�����ļ���:'+file.categoryName+'</div>',
                '                        <div class="a-close">��</div>',
                '                        <div class="clearfix"></div>',
                '                    </div>',
                '                    <div class="file-name">'+file.title+'</div>',
                '                    <div class="collected">�ղ���&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2333</div>',
                '                    <div class="a-third">',
                '                        <div class="file-uptime"><i class="fa fa-clock-o"></i>'+createDate+'</div>',
                '                        <div class="file-people"><i class="fa fa-user"></i>�ϴ���-'+file.creater+'</div>',
                '                    </div>',
                '                </div>',
                '                <div class="line"></div>',
                '                <div class="a-operate">',
                '                    <ul>',
                '                        <li><a href="/erudition/admin/file/download/"'+file.id+'><i class="fa fa-download"></i>&nbsp;&nbsp;����</a></li>',
                '                        <li><a href="#"><i class="fa fa-star"></i>&nbsp;&nbsp;�ղ�</a></li>',
                '                    </ul>',
                '                </div>',
                '                <div class="line"></div>',
                '                <div class="a-related">',
                '                    <ul>',
                '                        <li><a href="#"><i class="fa fa-link"><span id='+file.id+'></i>&nbsp;&nbsp;&nbsp;��������</a></li>'].join("");
            //���ӹ�������
            for(var i=0 ; i < fileRelations.length ; i++){
                var re = fileRelations[i].title;
                console.log('re= '+re);
                strDom1 = strDom1 + "<li id='"+fileRelations[i].id+"'><a href='#'><i class='fa fa-link'></i>&nbsp;&nbsp;&nbsp;"+
                    fileRelations[i].title+"</a></li>";
            }

            var strDom2=['                        <li><a href="#"><i class="fa fa-tag"></i>&nbsp;&nbsp;&nbsp;��ǩ</a></li>',
                '                    </ul>',
                '                </div>',
                '            </div>',
                '        </div>',
                '        <div class="next-btn"></div>',
                '        <!--<div class="clearfix"></div>-->',
                '    </div>'].join("");

            var strDom=strDom1+strDom2;
            //���뵽body��
            $("body").append(strDom);           //������ô��¼��ǰ����������أ�
            self.currentPopwin=$(".file-out");       //��¼��ǰ����
            //��ʾ���������ֲ�
            $(".mask").fadeIn();
            $(".file-out").fadeIn();
            //Ϊclose��mask���¼�
            $(".a-close").on("click",function(event){
                event.stopPropagation();
                $(".file-out").fadeOut();
                $(".mask").fadeOut();
                self.currentPopwin.remove();
            })

            $(".mask").on("click",function(event){
                event.stopPropagation();
                $(".file-out").fadeOut();
                $(".mask").fadeOut();
            })
        },
        carousel:function(){
            var self=this;
            console.log("�ֲ�����");
            console.log("��ǰ�±�Ϊ"+self.currentIndex);
            //�жϿɲ�����next
            if(self.currentIndex!=self.allIndex){
                $(self.next_btn).css({
                    "display":"block"
                });
                $(this.next_btn).click(function(){
                    self.next();
                })
            }else{
                $(self.next_btn).css({
                    "display":"none"
                })
            }
            //�жϿɲ�����pre
            if(self.currentIndex!=1){
                /*$(self.pre_btn).css({
                    "display":"block"
                });*/
                $(self.pre_btn).addClass("pre-bg");
                $(this.pre_btn).click(function(){
                    self.pre();
                })
            }else{
                $(self.pre_btn).removeClass("pre-bg");
            }
        },
        next:function(){
            var self=this;
            //�ı��±�
            self.currentIndex++;
            //��֮ǰ��DOMĨȥ
            self.currentPopwin.fadeOut(200).remove();
            //չʾ��һ��DOM
            self.getData(self.currentIndex);
            self.renderDOM();
            self.carousel();            //����һ������һ��DOM    �����������
            self.nextPopwin=$(".file-out");
            self.nextPopwin.fadeIn(200);
        },
        pre:function(){
            var self=this;
            //�ı��±�
            self.currentIndex--;
            //��֮ǰ��DOMĨȥ
            self.currentPopwin.fadeOut(200).remove();
            //չʾ��һ��DOM
            self.getData(self.currentIndex);
            self.renderDOM();
            self.carousel();            //����һ������һ��DOM
            self.nextPopwin=$(".file-out");
            self.nextPopwin.fadeIn(200);
        }
    };
    window["FileOut"]=FileOut;
})(jQuery)